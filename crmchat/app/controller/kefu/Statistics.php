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


use app\services\chat\ChatServiceRecordServices;

/**
 * Class Statistics
 * @package app\controller\kefu
 */
class Statistics extends AuthController
{

    /**
     * Statistics constructor.
     * @param ChatServiceRecordServices $services
     */
    public function __construct(ChatServiceRecordServices $services)
    {
        parent::__construct();
        $this->services = $services;
    }

    /**
     * 客户统计
     * @return mixed
     */
    public function sum()
    {
        return $this->success($this->services->getKefuSum((int)$this->kefuInfo['user_id']));
    }

    /**
     * 客户首页统计
     * @return mixed
     */
    public function index()
    {
        $year  = $this->request->get('year', date('Y'));
        $month = $this->request->get('month', date('m'));
        if ($month <= 0 || $month > 12) {
            return $this->fail('月份错误');
        }
        if ($year[0] > 2) {
            return $this->fail('年份错误');
        }
        if (strlen($year) > 4) {
            return $this->fail('年份错误');
        }
        return $this->success($this->services->getKefuStatistics((int)$this->kefuInfo['user_id'], (int)$year, (int)$month));
    }
}
