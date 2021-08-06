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

use think\facade\Route;
use app\http\middleware\AllowOriginMiddleware;
use app\http\middleware\open\OpenAuthTokenMiddleware;

Route::group('api', function () {

    Route::group('open', function () {

    })->middleware(OpenAuthTokenMiddleware::class);

})->middleware(AllowOriginMiddleware::class);
