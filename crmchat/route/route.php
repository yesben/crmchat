<?php

use think\facade\Route;

Route::get('install/index', 'InstallController/index');//安装程序
Route::post('install/index', 'InstallController/index');//安装程序
Route::get('upgrade/index', 'UpgradeController/index');
Route::get('upgrade/upgrade', 'UpgradeController/upgrade');
Route::miss(function () {

    //检测是否已安装CRMEB系统
    if (file_exists(root_path() . "public/install/") && !file_exists(root_path() . "public/install/install.lock")) {
        return redirect('/install/index');
    }

    return view(app()->getRootPath() . 'public' . DS . 'admin' . DS . 'index.html');

});
