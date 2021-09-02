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

namespace app\jobs;


use app\services\chat\ChatServiceDialogueRecordServices;
use app\services\chat\ChatServiceServices;
use crmeb\basic\BaseJobs;
use crmeb\services\SwooleTaskService;
use crmeb\traits\QueueTrait;

/**
 * Class WelcomeWords
 * @package app\jobs
 */
class WelcomeWords extends BaseJobs
{
    use QueueTrait;

    /**
     * @param $kefuId
     * @param $appid
     * @param $userId
     * @param $toUserId
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function doJob($kefuId, $appid, $userId, $toUserId)
    {
        /** @var ChatServiceDialogueRecordServices $logServices */
        $logServices = app()->make(ChatServiceDialogueRecordServices::class);
        $unMessagesCount = $logServices->getMessageNum(['user_id' => $userId, 'to_user_id' => $toUserId]);
        if ($unMessagesCount) {
            return true;
        }
        /** @var ChatServiceServices $service */
        $service = app()->make(ChatServiceServices::class);
        $data = $service->welcomeWords((int)$kefuId, $appid, (int)$userId, (int)$toUserId);
        if ($data) {
            SwooleTaskService::user()->to($toUserId)->data([
                'type' => 'reply',
                'data' => $data
            ])->push();
        }

        return true;
    }

}
