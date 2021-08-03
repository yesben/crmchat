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


use crmeb\exceptions\ApiException;
use crmeb\services\HttpService;
use think\facade\Cache;

/**
 * Class AbstractAPI
 * @package crmeb\services\uniPush
 */
class AbstractAPI
{

    const BASE_URL = 'https://restapi.getui.com/v2/{$appId}';

    /**
     * @var string
     */
    protected $appId;

    /**
     * @var string
     */
    protected $appKey;

    /**
     * @var string
     */
    protected $masterSecret;

    /**
     * @var HttpService
     */
    protected $http;

    /**
     * @var \think\cache\Driver
     */
    protected $cache;

    /**
     * AbstractAPI constructor.
     * @param HttpService $service
     */
    public function __construct(HttpService $service)
    {
        $this->http  = $service;
        $this->cache = Cache::store();
    }

    /**
     * 设置APPID
     * @param string $appId
     * @return $this
     */
    public function setAppId(string $appId)
    {
        $this->appId = $appId;
        return $this;
    }

    /**
     * 设置APPkey
     * @param string $appKey
     * @return $this
     */
    public function setAppKey(string $appKey)
    {
        $this->appKey = $appKey;
        return $this;
    }

    /**
     * 设置masterSecret
     * @param string $masterSecret
     * @return $this
     */
    public function setMasterSecret(string $masterSecret)
    {
        $this->masterSecret = $masterSecret;
        return $this;
    }

    /**
     * 返回API地址
     * @param string $path
     * @return string
     */
    public function url(string $path = '')
    {
        return $this->resolvBaseUrl() . ($path ? '/' . $path : '');
    }

    /**
     * @return string|string[]
     */
    protected function resolvBaseUrl()
    {
        return str_replace('{$appId}', $this->appId, self::BASE_URL);
    }


    /**
     * 获取签名
     * @return string
     */
    protected function getSign(float $msectime)
    {
        return hash('sha256', $this->appKey . $msectime . $this->masterSecret);
    }

    /**
     * 获取毫秒值
     * @return float
     */
    protected function getMsectime()
    {
        list($usec, $sec) = explode(" ", microtime());
        $time = ($sec . substr($usec, 2, 3));
        return $time;
    }

    /**
     * 获取token
     * @return mixed
     * @throws \Psr\SimpleCache\InvalidArgumentException
     */
    protected function getToken()
    {
        $name  = 'UNI_PUSH_TOKEN_' . $this->appId;
        $token = $this->cache->get($name);
        if (!$token) {
            $msectime = $this->getMsectime();
            $response = $this->http->postRequest($this->url('auth'), json_encode([
                'sign'      => $this->getSign($msectime),
                'timestamp' => $msectime,
                'appkey'    => $this->appKey
            ]), ['content-type:application/json']);
            $data     = $response['data'] ?? [];
            if (!isset($data['token'])) {
                throw new ApiException('获取token失败');
            }
            if ($data['token']) {
                $this->cache->set($name, $data['token'], 3600);
                $token = $data['token'];
            }
        }
        return $token;
    }

    /**
     * post请求
     * @param string $url
     * @param array $data
     * @return bool|string
     */
    public function parsePost(string $url, array $data)
    {
        return $this->http($this->url($url), $data, 'post');
    }

    /**
     * get请求
     * @param string $url
     * @param array $data
     * @return bool|string
     */
    public function parseGet(string $url, array $data)
    {
        return $this->http($this->url($url), $data, 'get');
    }

    /**
     * @param string $url
     * @param array $data
     * @param string $method
     * @return bool|string
     */
    public function http(string $url, array $data, string $method = 'post')
    {
        $token  = $this->getToken();
        $header = [
            'content-type:application/json;charset=utf-8',
            'token:' . $token
        ];
        return $this->http->request($url, $method, json_encode($data), $header);
    }
}
