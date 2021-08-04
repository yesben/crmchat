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


use crmeb\basic\BaseJobs;
use crmeb\services\uniPush\options\PushMessageOptions;
use crmeb\services\uniPush\options\PushOptions;
use crmeb\services\uniPush\PushMessage;
use crmeb\traits\QueueTrait;
use app\services\chat\ChatServiceDialogueRecordServices;

class UniPush extends BaseJobs
{

    use QueueTrait;

    public function doJob($jobsData)
    {
        $userInfo = $jobsData['userInfo'] ?? [];
        $clientId = $jobsData['client_id'] ?? null;
        $message  = $jobsData['message'] ?? [];
        if (!$clientId) {
            return true;
        }
        if (!$message) {
            return true;
        }
        if (!$userInfo) {
            return true;
        }
        /** @var PushMessage $uniPush */
        $uniPush              = app()->make(PushMessage::class);
        $option               = new PushOptions();
        $messageOption        = new PushMessageOptions();
        $messageOption->title = $userInfo['nickname'];
        switch ((int)($message['msn_type'] ?? 0)) {
            case ChatServiceDialogueRecordServices::MSN_TYPE_TXT:
                break;
            case ChatServiceDialogueRecordServices::MSN_TYPE_EMOT:
                break;
        }
        $messageOption->body = $message['content'] ?? '';
        $option->setAudience($clientId);
        $option->setPushMessage($messageOption);
        $uniPush->push($option);
        return true;
    }
}
