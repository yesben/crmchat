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
use app\services\kefu\LoginServices;
use app\validate\kefu\LoginValidate;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 * 登录
 * Class Login
 * @package app\controller\kefu
 */
class Login extends AuthController
{

    /**
     * Login constructor.
     * @param LoginServices $services
     */
    public function __construct(LoginServices $services)
    {
        parent::__construct();
        $this->services = $services;
    }

    /**
     * 客服登录
     * @param Request $request
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function login(Request $request)
    {
        [$account, $password] = $request->postMore([
            ['account', ''],
            ['password', ''],
        ], true);

        validate(LoginValidate::class)->check(['account' => $account, 'password' => $password]);

        $token = $this->services->authLogin($account, $password);

        return $this->success('登录成功', $token);
    }
}
