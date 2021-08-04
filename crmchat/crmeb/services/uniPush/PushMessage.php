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

namespace crmeb\services\uniPush;

use crmeb\services\uniPush\options\PushOptions;

/**
 * Class PushMessage
 * @package crmeb\services\uniPush
 */
class PushMessage
{

    //向单个用户推送消息，可根据cid指定用户
    const PUSH_ONE_CID = 'push/single/cid';

    /**
     * @var AbstractAPI
     */
    protected $abstractAPI;

    /**
     * PushMessage constructor.
     * @param AbstractAPI $abstractAPI
     */
    public function __construct(AbstractAPI $abstractAPI, array $config = [])
    {
        $this->abstractAPI = $abstractAPI;
        $this->config($config);
    }

    /**
     * 设置参数
     * @param array $data
     */
    public function config(array $data = [])
    {
        $this->abstractAPI->setAppId($data['appId'] ?? sys_config('uni_push_appid'))
            ->setAppKey($data['appKey'] ?? sys_config('uni_push_appkey'))
            ->setMasterSecret($data['masterSecret'] ?? sys_config('uni_push_masterSecret'));
    }

    /**
     * @param string $cid
     * @return bool|string
     */
    public function push(PushOptions $option)
    {
        if (!$option->requestId) {
            $option->requestId = $this->getNewRequestId();
        }
        return $this->abstractAPI->parsePost(self::PUSH_ONE_CID, $option->toArray());
    }

    /**
     * @return string
     */
    public function getNewRequestId()
    {
        list($msec, $sec) = explode(' ', microtime());
        $msectime  = number_format((floatval($msec) + floatval($sec)) * 1000, 0, '', '');
        $requestId = 'uni' . $msectime . mt_rand(10000, max(intval($msec * 10000) + 10000, 98369));
        return $requestId;
    }


}
