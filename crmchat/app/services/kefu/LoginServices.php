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

namespace app\services\kefu;


use app\dao\chat\ChatServiceDao;
use crmeb\basic\BaseServices;
use crmeb\exceptions\AuthException;
use crmeb\services\CacheService;
use crmeb\utils\ApiErrorCode;
use crmeb\utils\JwtAuth;
use Psr\SimpleCache\InvalidArgumentException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\exception\ValidateException;
use Firebase\JWT\ExpiredException;

/**
 * Class LoginServices
 * @package app\services\kefu
 */
class LoginServices extends BaseServices
{

    /**
     * LoginServices constructor.
     * @param ChatServiceDao $dao
     */
    public function __construct(ChatServiceDao $dao)
    {
        $this->dao = $dao;
    }

    /**
     * 客服账号密码登录
     * @param string $account
     * @param string $password
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function authLogin(string $account, string $password = null, int $isApp = 0)
    {
        $kefuInfo = $this->dao->get(['account' => $account]);
        if (!$kefuInfo) {
            throw new ValidateException('没有此用户');
        }
        if ($password && !password_verify($password, $kefuInfo->password)) {
            throw new ValidateException('账号或密码错误');
        }
        if (!$kefuInfo->status) {
            throw new ValidateException('您已被禁止登录');
        }
        $token = $this->createToken($kefuInfo->id, 'kefu');
        $kefuInfo->online = 1;
        $kefuInfo->update_time = time();
        $kefuInfo->ip = request()->ip();
        $kefuInfo->status = 1;
        if (!$kefuInfo->is_app) {
            $kefuInfo->is_app = $isApp;
        }
        $kefuInfo->save();
        return [
            'token' => $token['token'],
            'exp_time' => $token['params']['exp'],
            'kefuInfo' => $kefuInfo->hidden(['password', 'ip', 'update_time', 'add_time', 'status', 'mer_id', 'customer', 'notify'])->toArray()
        ];
    }

    /**
     * 解析token
     * @param string $token
     * @return array
     * @throws InvalidArgumentException
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function parseToken(string $token, int $code = 410003)
    {
        $noCli = !request()->isCli();

        /** @var CacheService $cacheService */
        $cacheService = app()->make(CacheService::class);
        //检测token是否过期
        $md5Token = md5($token);
        if (!$token || !$cacheService->hasToken($md5Token) || !($cacheToken = $cacheService->getTokenBucket($md5Token))) {
            throw new AuthException(ApiErrorCode::ERR_LOGIN, $code);
        }
        if ($token === 'undefined') {
            throw new AuthException(ApiErrorCode::ERR_LOGIN, $code);
        }
        //是否超出有效次数
        if (isset($cacheToken['invalidNum']) && $cacheToken['invalidNum'] >= 3) {
            $cacheService->clearToken($md5Token);
            throw new AuthException(ApiErrorCode::ERR_LOGIN_INVALID, $code);
        }

        /** @var JwtAuth $jwtAuth */
        $jwtAuth = app()->make(JwtAuth::class);
        //设置解析token
        [$id, $type] = $jwtAuth->parseToken($token);

        //验证token
        try {
            $jwtAuth->verifyToken();
            $cacheService->setTokenBucket($md5Token, $cacheToken, $cacheToken['exp']);
        } catch (ExpiredException $e) {
            $cacheToken['invalidNum'] = isset($cacheToken['invalidNum']) ? $cacheToken['invalidNum']++ : 1;
            $cacheService->setTokenBucket($md5Token, $cacheToken, $cacheToken['exp']);
        } catch (\Throwable $e) {
            $noCli && $cacheService->clearToken($md5Token);
            throw new AuthException(ApiErrorCode::ERR_LOGIN_INVALID, $code);
        }

        //获取管理员信息
        $adminInfo = $this->dao->get($id);
        if (!$adminInfo || !$adminInfo->id) {
            $noCli && $cacheService->clearToken($md5Token);
            throw new AuthException(ApiErrorCode::ERR_LOGIN_STATUS, $code);
        }

        $adminInfo->type = $type;

        return $adminInfo->hidden(['password', 'ip', 'status']);
    }

    /**
     * 检测有没有人扫描登录
     * @param string $key
     * @return array|int[]
     * @throws InvalidArgumentException
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function scanLogin(string $key)
    {
        $hasKey = CacheService::has($key);
        if ($hasKey === false) {
            $status = 0;//不存在需要刷新二维码
        } else {
            $keyValue = CacheService::get($key);
            if ($keyValue === '0') {
                $status = 1;//正在扫描中
                $kefuInfo = $this->dao->get(['uniqid' => $key], ['account', 'uniqid']);
                if ($kefuInfo) {
                    $tokenInfo = $this->authLogin($kefuInfo->account);
                    $tokenInfo['status'] = 3;
                    $kefuInfo->uniqid = '';
                    $kefuInfo->save();
                    CacheService::delete($key);
                    return $tokenInfo;
                }
            } else {
                $status = 2;//没有扫描
            }
        }
        return ['status' => $status];
    }
}
