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

namespace app\dao\chat;


use app\models\chat\ChatUser;
use crmeb\basic\BaseDao;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;

/**
 * Class ChatUserDao
 * @package app\dao\chat
 */
class ChatUserDao extends BaseDao
{

    /**
     * 获取当前模型
     * @return string
     */
    protected function setModel(): string
    {
        return ChatUser::class;
    }

    /**
     * @return mixed
     */
    public function max(array $where)
    {
        return $this->getModel()->where($where)->max('uid');
    }

    /**
     * 获取用户列表
     * @param array $where
     * @param string $field
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getUserList(array $where, string $field = '*')
    {
        return $this->search()->when(isset($where['ids']) && $where['ids'], function ($query) use ($where) {
            $query->whereIn('id', $where['ids']);
        })->field($field)->select()->toArray();
    }

    /**
     * @param array $where
     * @return \crmeb\basic\BaseModel|mixed|\think\Model
     */
    public function searchModel(array $where = [])
    {
        return $this->search($where);
    }

    /**
     * @param array $where
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function kefuStatistics(array $where)
    {
        $type = $where['type'] ?? 0;
        return $this->search()
            ->when(isset($where['user_id']) && $where['user_id'], function ($query) use ($where) {
                $query->where('id', $where['user_id']);
            })->when(isset($where['appid']) && $where['appid'], function ($query) use ($where) {
                $query->where('appid', $where['appid']);
            })->whereBetweenTime('create_time', $where['startTime'], $where['endTime'])
            ->field([!$type ? "DATE_FORMAT(create_time,'%Y-%m-%d') as month" : "DATE_FORMAT(create_time,'%Y-%m') as month", 'count(*) as number'])
            ->group('month')
            ->select()->toArray();
    }

    /**
     * 搜索用户统计
     * @param string $time
     * @param int $isTourist
     * @return array
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws \think\db\exception\DbException
     */
    public function getKefuMobileStatisticsList(string $time, int $isTourist = 0)
    {
        if (in_array($time, ['today', 'yesterday'])) {
            $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d %H') as time";
        } else if (in_array($time, ['quarter', 'year'])) {
            $fieldTime = "DATE_FORMAT(create_time,'%Y-%m') as time";
        } else if (in_array($time, ['week', 'month', 'last week', 'last month'])) {
            $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d') as time";
        } elseif (preg_match('/^lately+[1-9]{1,3}/', $time)) {
            $day = (int)str_replace('lately', '', $time);
            if ($day > 90 && $day < 365) {
                $fieldTime = "DATE_FORMAT(create_time,'%Y-%m') as time";
            } elseif ($day > 365) {
                $fieldTime = "DATE_FORMAT(create_time,'%Y') as time";
            } elseif ($day < 30) {
                $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d') as time";
            } elseif ($day <= 1) {
                $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d %H') as time";
            } else {
                $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d') as time";
            }
        } elseif (strstr($time, '-') !== false) {
            $fieldTime = "DATE_FORMAT(create_time,'%Y-%m-%d') as time";
        }
        return $this->search()->where('is_tourist', $isTourist)->when(true, function ($query) use ($time) {
            $time = $time ?: 'today';
            time_model($query, $time, 'create_time');
        })->field([$fieldTime, 'count(*) as number'])->group('time')->select()->toArray();
    }

}
