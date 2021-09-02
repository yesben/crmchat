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


use app\dao\chat\ChatAutoReplyDao;
use crmeb\basic\BaseServices;

/**
 * Class ChatAutoReplyServices
 * @package app\services\chat
 * @method array getReplyList(array $where) 获取回复列表
 * @method ChatAutoReplyDao setApp($app) 设置app
 */
class ChatAutoReplyServices extends BaseServices
{

    /**
     * ChatAutoReplyServices constructor.
     * @param ChatAutoReplyDao $dao
     */
    public function __construct(ChatAutoReplyDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * @param string $appId
     * @param int $userId
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getAuthReply(string $appId, int $userId)
    {
        [$page, $limit] = $this->getPageValue();

        return $this->dao->getReply(['appid' => $appId, 'user_id' => $userId], $page, $limit);
    }


}
