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

namespace app\models\chat;


use app\models\chat\user\ChatUserLabel;
use app\models\chat\user\ChatUserLabelAssist;
use crmeb\basic\BaseModel;
use crmeb\traits\ModelTrait;
use think\Model;

/**
 * 客户
 * Class ChatUser
 * @package app\models\chat
 */
class ChatUser extends BaseModel
{

    use ModelTrait;

    /**
     * 表名
     * @var string
     */
    protected $name = 'chat_user';

    /**
     * 主键id
     * @var string
     */
    protected $key = 'id';

    /**
     * @return \think\model\relation\HasManyThrough
     */
    public function label()
    {
        return $this->hasManyThrough(ChatUserLabel::class, ChatUserLabelAssist::class, 'user_id', 'id', 'id', 'label_id');
    }

    /**
     * @param Model $query
     * @param $value
     */
    public function searchNicknameLike($query, $value)
    {
        if ($value) {
            $query->where(function ($query) use ($value) {
                $query->where('nickname|phone', 'like', '%' . $value . '%');
            });
        }
    }

    /**
     * @param Model $query
     * @param $value
     */
    public function searchGroupId($query, $value)
    {
        if ($value) {
            $query->where('group_id', $value);
        }
    }
}
