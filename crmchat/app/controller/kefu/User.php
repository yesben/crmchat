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

namespace app\controller\kefu;


use app\Request;
use app\services\chat\ChatServiceDialogueRecordServices;
use app\services\chat\ChatServiceRecordServices;
use app\services\chat\ChatServiceServices;
use app\services\chat\ChatUserServices;
use app\services\chat\user\ChatUserGroupServices;
use app\services\chat\user\ChatUserLabelAssistServices;
use app\services\chat\user\ChatUserLabelCateServices;
use app\services\chat\user\ChatUserLabelServices;
use app\services\system\attachment\SystemAttachmentServices;
use app\validate\chat\ChatServiceValidate;
use crmeb\services\CacheService;
use crmeb\services\UploadService;
use crmeb\utils\Character;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Config;

/**
 * Class User
 * @package app\controller\kefu
 */
class User extends AuthController
{

    /**
     * User constructor.
     * @param ChatServiceRecordServices $services
     */
    public function __construct(ChatServiceRecordServices $services)
    {
        parent::__construct();
        $this->services = $services;
    }

    /**
     * 获取当前登录客服
     * @return mixed
     */
    public function getKefuInfo()
    {
        $kefuInfo             = $this->kefuInfo->toArray();
        $kefuInfo['password'] = '******';
        return $this->success($kefuInfo);
    }

    /**
     * 个人中心修改客服信息
     * @param ChatServiceValidate $validate
     * @param ChatServiceServices $services
     * @return mixed
     */
    public function updateKefu(ChatServiceValidate $validate, ChatServiceServices $services)
    {
        $data = $this->request->postMore([
            ['nickname'],
            ['avatar'],
            ['password'],
            ['phone'],
        ]);

        $validate->check($data);

        if ($data['password'] === '******') {
            unset($data['password']);
        } else {
            $data['password'] = $services->passwordHash($data['password']);
        }

        $services->update($this->kefuId, $data);

        return $this->success('修改成功');
    }

    /**
     * 获取客户列表
     * @param string $nickname
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getUserList(Character $character, string $nickname = '')
    {
        return $this->success(
            $character->groupByInitials(
                $this->services->getUserList(
                    $this->kefuInfo['appid'],
                    $this->kefuInfo['user_id'],
                    $nickname),
                'nickname'
            )
        );
    }

    /**
     * 获取当前客服和用户的聊天记录
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function recordList(string $nickname = '', $is_tourist = '')
    {
        return $this->success($this->services->getServiceList($this->kefuInfo['appid'], (int)$this->kefuInfo['user_id'], $nickname, $is_tourist));
    }

    /**
     * 获取用户信息
     * @param ChatUserServices $services
     * @param $userId
     * @return mixed
     */
    public function userInfo(ChatUserServices $services, $userId)
    {
        return $this->success($services->getUserInfo((int)$userId, ['*'], ['label'])->toArray());
    }

    /**
     * 用户标签
     * @param ChatUserLabelCateServices $services
     * @return mixed
     */
    public function getUserLabel(ChatUserLabelCateServices $services)
    {
        $id = $this->request->get('id', 0);
        return $this->success($services->getLabelAll((int)$id));
    }

    /**
     * 获取所有用户标签下面的用户
     * @param ChatUserLabelServices $services
     * @return mixed
     */
    public function getLabelAll(ChatUserLabelServices $services)
    {
        return $this->success($services->getUserLabel(0));
    }

    /**
     * 获取用户分组
     * @param ChatUserGroupServices $services
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getUserGroup(ChatUserGroupServices $services)
    {
        return $this->success($services->getGroupList());
    }

    /**
     * 设置分组
     * @param ChatUserGroupServices $services
     * @param ChatUserServices $userServices
     * @param $uid
     * @param $id
     * @return mixed
     */
    public function setUserGroup(ChatUserGroupServices $services, ChatUserServices $userServices, $userId, $id)
    {
        if (!$services->count(['id' => $id])) {
            return $this->fail('添加的会员标签不存在');
        }
        if (!($userInfo = $userServices->get($userId))) {
            return $this->fail('用户不存在');
        }
        if ($userInfo->group_id == $id) {
            return $this->fail('已拥有此分组');
        }
        $userInfo->group_id = $id;
        if ($userInfo->save()) {
            return $this->success('设置成功');
        } else {
            return $this->fail('设置失败');
        }
    }

    /**
     * 设置用户标签
     * @param ChatUserLabelAssistServices $services
     * @param $uid
     * @return mixed
     */
    public function setUserLabel(ChatUserLabelAssistServices $services, $userId)
    {
        [$labels, $unLabelIds] = $this->request->postMore([
            ['label_ids', []],
            ['un_label_ids', []]
        ], true);
        if (!count($labels) && !count($unLabelIds)) {
            return $this->fail('缺少标签id');
        }
        if ($services->setUserLable($userId, $labels) && $services->unUserLabel($userId, $unLabelIds)) {
            return $this->success('设置成功');
        } else {
            return $this->fail('设置失败');
        }
    }

    /**
     * 退出登陆
     * @return mixed
     */
    public function logout()
    {
        $key = trim(ltrim($this->request->header(Config::get('cookie.token_name')), 'Bearer'));
        CacheService::redisHandler()->delete($key);
        return $this->success();
    }

    /**
     * 图片上传
     * @param Request $request
     * @return mixed
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    public function upload(Request $request, SystemAttachmentServices $services)
    {
        $data = $request->postMore([
            ['filename', 'file'],
        ]);
        if (!$data['filename']) return $this->fail('参数有误');
        if (CacheService::has('start_uploads_' . $request->kefuId()) && CacheService::get('start_uploads_' . $request->kefuId()) >= 100) return $this->fail('非法操作');
        $upload = UploadService::init();
        $info   = $upload->to('store/comment')->validate()->move($data['filename']);
        if ($info === false) {
            return $this->fail($upload->getError());
        }
        $res = $upload->getUploadInfo();
        $services->attachmentAdd($res['name'], $res['size'], $res['type'], $res['dir'], $res['thumb_path'], 1, (int)sys_config('upload_type', 1), $res['time'], 2);
        if (CacheService::has('start_uploads_' . $request->kefuId()))
            $start_uploads = (int)CacheService::get('start_uploads_' . $request->kefuId());
        else
            $start_uploads = 0;
        $start_uploads++;
        CacheService::set('start_uploads_' . $request->kefuId(), $start_uploads, 86400);
        $res['dir'] = path_to_url($res['dir']);
        if (strpos($res['dir'], 'http') === false) $res['dir'] = $request->domain() . $res['dir'];
        return $this->success('图片上传成功!', ['name' => $res['name'], 'url' => $res['dir']]);
    }

    /**
     * 获取当前客服所有没读条数
     * @param ChatServiceDialogueRecordServices $services
     * @return mixed
     */
    public function getMessageCount(ChatServiceDialogueRecordServices $services)
    {
        return $this->success(['count' => $services->getMessageNum(['user_id' => $this->kefuInfo['user_id'], 'type' => 0])]);
    }
}
