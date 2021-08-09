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

namespace app\services\chat;


use app\dao\chat\ChatServiceDao;
use app\services\ApplicationServices;
use crmeb\basic\BaseServices;
use crmeb\exceptions\AdminException;
use crmeb\services\FormBuilder;
use FormBuilder\Exception\FormBuilderException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\exception\ValidateException;

/**
 * Class ChatServiceServices
 * @package app\services\chat
 */
class ChatServiceServices extends BaseServices
{

    /**
     * 创建form表单
     * @var FormBuilder
     */
    protected $builder;

    /**
     * ChatServiceServices constructor.
     * @param ChatServiceDao $dao
     * @param FormBuilder $builder
     */
    public function __construct(ChatServiceDao $dao, FormBuilder $builder)
    {
        $this->dao     = $dao;
        $this->builder = $builder;
    }

    /**
     * 获取客服列表
     * @param array $where
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getServiceList(array $where)
    {
        [$page, $limit] = $this->getPageValue();
        $list  = $this->dao->getServiceList($where, $page, $limit);
        $count = $this->dao->count($where);
        return compact('list', 'count');
    }

    /**
     * 创建客服表单
     * @param array $formData
     * @return mixed
     * @throws FormBuilderException
     */
    public function createServiceForm(array $formData = [])
    {
        if ($formData) {
            $field[] = $this->builder->input('appid', '应用ID', $formData['appid'])->disabled(true);
        } else {
            /** @var ApplicationServices $seervice */
            $seervice = app()->make(ApplicationServices::class);
            $field[]  = $this->builder->select('appid', '请选择应用')->options($seervice->getOptions())->required();
        }
        $field[] = $this->builder->frameImage('avatar', '客服头像', $this->url('admin/widget.images/index', ['fodder' => 'avatar'], true), $formData['avatar'] ?? '')->icon('ios-add')->width('950px')->height('420px');
        $field[] = $this->builder->input('nickname', '客服名称', $formData['nickname'] ?? '')->col(24)->required();
        $field[] = $this->builder->input('phone', '手机号码', $formData['phone'] ?? '')->col(24)->required();
        if ($formData) {
            $field[] = $this->builder->input('account', '登录账号', $formData['account'] ?? '')->col(24)->required();
            $field[] = $this->builder->input('password', '登录密码')->type('password')->col(24);
            $field[] = $this->builder->input('true_password', '确认密码')->type('password')->col(24);
        } else {
            $field[] = $this->builder->input('account', '登录账号')->col(24)->required();
            $field[] = $this->builder->input('password', '登录密码')->type('password')->col(24)->required();
            $field[] = $this->builder->input('true_password', '确认密码')->type('password')->col(24)->required();
        }
        $field[] = $this->builder->switches('status', '客服状态', (int)($formData['status'] ?? 0))->falseValue(0)->trueValue(1)->openStr('打开')->closeStr('关闭')->size('large');
        return $field;
    }

    /**
     * 创建客服获取表单
     * @return array
     * @throws FormBuilderException
     */
    public function create()
    {
        return create_form('添加客服', $this->createServiceForm(), $this->url('/chat/kefu'), 'POST');
    }

    /**
     * 编辑获取表单
     * @param int $id
     * @return array
     * @throws FormBuilderException
     */
    public function edit(int $id)
    {
        $serviceInfo = $this->dao->get($id);
        if (!$serviceInfo) {
            throw new AdminException('数据不存在!');
        }
        return create_form('编辑客服', $this->createServiceForm($serviceInfo->toArray()), $this->url('/chat/kefu/' . $id), 'PUT');
    }

    /**
     * 获取某人的聊天记录用户列表
     * @param int $uid
     * @return array|array[]
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getChatUser(int $userId)
    {
        /** @var ChatServiceDialogueRecordServices $serviceLog */
        $serviceLog = app()->make(ChatServiceDialogueRecordServices::class);
        /** @var ChatUserServices $serviceUser */
        $serviceUser = app()->make(ChatUserServices::class);
        $userIds     = $serviceLog->getChatUserIds($userId);
        if (!$userIds) {
            return [];
        }
        return $serviceUser->getUserList(['ids' => $userIds], 'nickname,uid,avatar as headimgurl');
    }

    /**
     * 检查用户是否是客服
     * @param array $where
     * @return bool
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkoutIsService(array $where)
    {
        return $this->dao->count($where) ? true : false;
    }

    /**
     * 查询聊天记录和获取客服uid
     * @param string $appId APPID
     * @param int $uid 当前用户uid
     * @param int $idTo 上翻页id
     * @param int $limit 展示条数
     * @param int $toUserId 客服id
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getRecord(string $appId, array $user, int $idTo, int $limit = 10, int $toUserId = 0, int $cookieUid = 0, int $kefuId = 0)
    {
        $uid = $user['uid'] ?? 0;
        /** @var ChatUserServices $userServices */
        $userServices = app()->make(ChatUserServices::class);
        $userInfo     = $userServices->get(['uid' => $uid, 'appid' => $appId]);
        if (!$uid || !$userInfo) {
            /** @var ApplicationServices $appService */
            $appService = app()->make(ApplicationServices::class);
            $userInfo   = $appService->createUser($appId, $user);
            $uid        = $userInfo['uid'];
            $userId     = $userInfo['id'];
        } else {
            $userId = $userInfo->id;
        }

        $toUserId = $this->dao->count(['appid' => $appId, 'status' => 1, 'user_id' => $toUserId]) ? $toUserId : 0;
        if (!$toUserId && $kefuId) {
            $toUserId = $this->dao->value(['appid' => $appId, 'status' => 1, 'id' => $kefuId], 'user_id');
        }
        if (!$toUserId) {
            $serviceInfoList = $this->getServiceList(['appid' => $appId, 'status' => 1, 'online' => 1]);
            if (!count($serviceInfoList)) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
            $uids = array_column($serviceInfoList['list'], 'user_id');
            if (!$uids) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
            /** @var ChatServiceRecordServices $recordServices */
            $recordServices = app()->make(ChatServiceRecordServices::class);
            //上次聊天客服优先对话
            $toUserId = $recordServices->getLatelyMsgUid(['appid' => $appId, 'to_user_id' => $userId], 'user_id');
            //如果上次聊天的客不在当前客服中从新
            if (!in_array($toUserId, $uids)) {
                $toUserId = 0;
            }
            if (!$toUserId) {
                mt_srand();
                $toUserId = $uids[array_rand($uids)] ?? 0;
            }
            if (!$toUserId) {
                throw new ValidateException('暂无客服人员在线，请稍后联系');
            }
        }
        $toUserInfo = $this->dao->get(['user_id' => $toUserId], ['nickname', 'avatar']);
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices           = app()->make(ChatServiceDialogueRecordServices::class);
        $result                = [
            'serviceList'      => [],
            'to_user_id'       => $toUserId,
            'is_tourist'       => $userInfo['is_tourist'],
            'uid'              => $uid,
            'user_id'          => $userId,
            'site_name'        => sys_config('site_name'),
            'nickname'         => $userInfo['nickname'],
            'avatar'           => $userInfo['avatar'],
            'to_user_nickname' => $toUserInfo['nickname'],
            'to_user_avatar'   => $toUserInfo['avatar']
        ];
        $serviceLogList        = $logServices->getServiceChatList(['appid' => $appId, 'chat' => [$userId, $toUserId]], $limit, $idTo);
        $result['serviceList'] = array_reverse($logServices->tidyChat($serviceLogList));
        return $result;
    }
}
