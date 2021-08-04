<?php
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2020 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

namespace app\webscoket;

use app\services\chat\ChatServiceDialogueRecordServices;
use app\services\chat\ChatServiceRecordServices;
use app\services\chat\ChatServiceServices;
use app\services\chat\ChatUserServices;
use crmeb\utils\Arr;
use think\facade\Log;

/**
 * socket 事件基础类
 * Class BaseHandler
 * @package app\webscoket
 */
abstract class BaseHandler
{

    /**
     * @var Manager
     */
    protected $manager;

    /**
     * @var Room
     */
    protected $room;

    /**
     * @var int
     */
    protected $fd;

    /**
     * 用户聊天端
     * @var int|null
     */
    protected $formType;

    /**
     * 登陆
     * @param array $data
     * @param Response $response
     * @return mixed
     */
    abstract public function login(array $data = [], Response $response);

    /**
     * 事件入口
     * @param $event
     * @return |null
     */
    public function handle($event)
    {
        [$method, $result, $manager, $room] = $event;
        $this->manager  = $manager;
        $this->room     = $room;
        $this->fd       = array_shift($result);
        $this->formType = array_shift($result);
        if (method_exists($this, $method)) {
            return $this->{$method}(...$result);
        } else {
            Log::error('socket 回调事件' . $method . '不存在,消息内容为:' . json_encode($result));
            return null;
        }
    }

    /**
     * 聊天事件
     * @param array $data
     * @param Response $response
     * @return bool|\think\response\Json|null
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function chat(array $data = [], Response $response)
    {
        $user = $this->room->get($this->fd);
        if (!$user) {
            return $response->fail('聊天用户不存在');
        }
        $appId      = $user['appid'];
        $to_user_id = $data['to_user_id'] ?? 0;
        $msn_type   = $data['type'] ?? 0;
        $msn        = $data['msn'] ?? '';
        $formType   = $this->formType ?? null;
        $userId     = $user['user_id'];
        $other      = $data['other'] ?? [];
        if (!$to_user_id) {
            return $response->message('err_tip', ['msg' => '用户不存在']);
        }
        if ($to_user_id == $userId) {
            return $response->message('err_tip', ['msg' => '不能和自己聊天']);
        }

        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = app()->make(ChatServiceDialogueRecordServices::class);
        if (!in_array($msn_type, ChatServiceDialogueRecordServices::MSN_TYPE)) {
            return $response->message('err_tip', ['msg' => '格式错误']);
        }
        $msn              = trim(strip_tags(str_replace(["\n", "\t", "\r", "&nbsp;"], '', htmlspecialchars_decode($msn))));
        $data             = compact('to_user_id', 'msn_type', 'msn');
        $data['add_time'] = time();
        $data['appid']    = $appId;
        $data['user_id']  = $userId;

        $toUserFd = $this->getUserIdByFd($to_user_id);

        $toUser    = ['to_user_id' => -1];
        $fremaData = [];
        foreach ($toUserFd as $value) {
            if ($frem = $this->room->get($value)) {
                $fremaData[] = $frem;
                if ($frem['to_user_id'] == $userId) {
                    $toUser = $frem;
                }
            }
        }
        //是否在线
        $userOnline = count($fremaData) ? 1 : 0;
        //是否和当前用户对话
        $online       = $toUserFd && $toUser && $toUser['to_user_id'] == $userId;
        $data['type'] = $online ? 1 : 0;
        if ($msn_type == 5) {
            $data['other'] = json_encode($other);
        }
        $data              = $logServices->save($data);
        $data              = $data->toArray();
        $data['_add_time'] = $data['add_time'];
        $data['add_time']  = strtotime($data['add_time']);

        /** @var ChatUserServices $userService */
        $userService      = app()->make(ChatUserServices::class);
        $_userInfo        = $userService->getUserInfo($data['user_id'], ['nickname', 'avatar', 'is_tourist']);
        $isTourist        = $_userInfo['is_tourist'];
        $data['nickname'] = $_userInfo['nickname'];
        $data['avatar']   = $_userInfo['avatar'];

        //用户向客服发送消息，判断当前客服是否在登录中
        /** @var ChatServiceRecordServices $serviceRecored */
        $serviceRecored  = app()->make(ChatServiceRecordServices::class);
        $unMessagesCount = $logServices->getMessageNum(['user_id' => $userId, 'to_user_id' => $to_user_id, 'type' => 0]);
        //记录当前用户和他人聊天记录
        $data['recored'] = $serviceRecored->saveRecord($user['appid'], $userId, $to_user_id, $msn, $formType ?? 0, $msn_type, $unMessagesCount, $isTourist, $data['nickname'], $data['avatar'], $userOnline);
        //是否在线
        if ($online) {
            $this->manager->pushing($toUserFd, $response->message('reply', $data)->getData());
        } else {
            //用户在线，可是没有和当前用户进行聊天，给当前用户发送未读条数
            if ($toUserFd && $toUser['to_user_id'] != $userId) {
                $data['recored']['nickname'] = $_userInfo['nickname'];
                $data['recored']['avatar']   = $_userInfo['avatar'];

                $data['recored']['online'] = $userOnline;
                $allUnMessagesCount        = $logServices->getMessageNum(['user_id' => $userId, 'type' => 0]);
                $this->manager->pushing($toUserFd, $response->message('mssage_num', [
                    'user_id' => $userId,
                    'num'     => $unMessagesCount,//某个用户的未读条数
                    'allNum'  => $allUnMessagesCount,//总未读条数
                    'recored' => $data['recored']
                ])->getData());

            }
        }
        return $response->message('chat', $data);
    }

    /**
     * 切换用户聊天
     * @param array $data
     * @param Response $response
     * @return \think\response\Json
     */
    public function to_chat(array $data = [], Response $response)
    {
        $toUserId = $data['id'] ?? 0;
        $res      = $this->room->get($this->fd);
        if ($res) {
            $userId = $res['user_id'];
            $this->updateTabelField($userId, $toUserId);

            //不是游客进入记录
            if (!$res['tourist'] && $toUserId) {
                /** @var ChatServiceRecordServices $service */
                $service = app()->make(ChatServiceRecordServices::class);
                $service->update(['user_id' => $userId, 'to_user_id' => $toUserId], ['mssage_num' => 0]);
                /** @var ChatServiceDialogueRecordServices $logServices */
                $logServices = app()->make(ChatServiceDialogueRecordServices::class);
                $logServices->update(['user_id' => $toUserId, 'to_user_id' => $userId], ['type' => 1]);
            }
            return $response->message('mssage_num', ['user_id' => $toUserId, 'num' => 0, 'recored' => (object)[]]);
        }
    }

    /**
     * @param int $userId
     * @param int $toUserId
     * @param string $field
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function updateTabelField(int $userId, int $toUserId, string $field = 'to_user_id')
    {
        $fds = $this->getUserIdByFd($userId);
        foreach ($fds as $fd) {
            $this->room->update($fd, $field, $toUserId);
        }
    }

    /**
     * @param int $userId
     * @return array
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function getUserIdByFd(int $userId)
    {
        $toUserFd = [];
        foreach (['user', 'kefu'] as $type) {
            $toUserFd = array_merge($toUserFd, $this->manager->getUserIdByFd($userId, $type) ?: []);
        }
        return array_merge(array_unique($toUserFd));
    }


    /**
     * 测试原样返回
     * @param array $data
     * @param Response $response
     * @return bool|\think\response\Json|null
     */
    public function test(array $data = [], Response $response)
    {
        return $response->success($data);
    }

    /**
     * 关闭连接触发
     * @param array $data
     * @param Response $response
     */
    public function close(array $data = [], Response $response)
    {
        $usreId   = $data['data']['user_id'] ?? 0;
        $toUsreId = $data['data']['to_user_id'] ?? 0;
        if ($usreId) {
            /** @var ChatServiceRecordServices $service */
            $service = app()->make(ChatServiceRecordServices::class);
            $service->updateRecord(['to_user_id' => $usreId], ['online' => 0]);

            if ($toUsreId) {
                $toUserFd  = $this->getUserIdByFd($toUsreId);
                $fremaData = [];
                foreach ($toUserFd as $value) {
                    if ($frem = $this->room->get($value)) {
                        $fremaData[] = $frem;
                    }
                }

                $this->manager->pushing(array_column($fremaData, 'fd'), $response->message('online', [
                    'online'  => 0,
                    'user_id' => $usreId
                ]), $this->fd);
            }
        }
    }
}
