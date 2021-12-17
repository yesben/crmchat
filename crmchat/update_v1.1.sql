-- v1.1版本新增sql

-- 2021/10/21新增
ALTER TABLE `eb_chat_service_record` ADD `delete_time` INT(10) NULL DEFAULT NULL COMMENT '删除字段' AFTER `update_time`;
-- 2021/11/16新增
ALTER TABLE `eb_chat_user_label` ADD `sort` INT(10) NOT NULL DEFAULT '0' COMMENT '排序' AFTER `cate_id`;
-- 2021/11/18新增
CREATE TABLE `eb_qrcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '二维码名称',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '地址',
  `user_ids` varchar(255) NOT NULL DEFAULT '' COMMENT '用户ids',
  `appid` varchar(35) NOT NULL DEFAULT '' COMMENT 'APPID',
  `sort` int(10) NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='二维码';
-- 新增配置
INSERT INTO `eb_system_config` (`id`, `menu_name`, `type`, `input_type`, `config_tab_id`, `parameter`, `upload_type`, `required`, `width`, `high`, `value`, `info`, `desc`, `sort`, `status`) VALUES
(null, 'qq_map_key', 'text', 'input', 1, '', 0, '', 100, 0, '""', '腾讯地图开放平台KEY', '腾讯地图开放平台KEY,申请地址:https://lbs.qq.com/dev/console/application/mine', 0, 1),
(null, 'kefu_icon_url3', 'upload', '', 69, '', 1, '', 0, 0, '""', '客服图标地址自定义', '客服图标地址自定义', 0, 2),
(null, 'kefu_icon_url2', 'upload', '', 69, '', 1, '', 0, 0, '"data:image/png;base64,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"', '客服图标地址圆形', '客服图标地址圆形', 0, 0),
(null, 'kefu_icon_url1', 'upload', '', 69, '', 1, '', 0, 0, '"data:image/png;base64,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"', '客服图标地址', '客服图标地址', 0, 0),
(null, 'kefu_icon_type', 'radio', '', 69, '0=>默认图标\n1=>悬浮球\n2=>自定义', 0, '', 0, 0, '"1"', '客服图标', '客服图标', 0, 2);
-- 新增菜单
INSERT INTO `eb_system_menus` (`id`, `pid`, `icon`, `menu_name`, `module`, `controller`, `action`, `api_url`, `methods`, `params`, `sort`, `is_show`, `is_show_path`, `access`, `menu_path`, `path`, `auth_type`, `header`, `is_header`, `unique_auth`, `is_del`) VALUES
(null, 12, '', 'APP在线升级', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/setting/app/version', '12', 1, '', 0, 'setting-app-version', 0),
(null, 165, '', '站点统计', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/kefu/statistics', '165', 1, '', 0, 'admin-kefu-statistics', 0),
(null, 165, '', '客服二维码', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/kefu/qrcode', '165', 1, '', 0, 'admin-kefu-qrcode', 0),
(null, 165, '', '聊天记录', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/kefu/record', '165', 1, '', 0, 'admin-kefu-record', 0),
(null, 1096, '', '设置客服图标', 'admin', '', '', '/api/admin/setting/config/kefu', 'GET', '[]', 0, 0, 1, 1, '', '12/656/1096', 2, '', 0, 'adminapi-setting-set_kf_icon', 0),
(null, 656, '', '客服图标', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/setting/system_group_data/kf_icon', '12/656', 1, '', 0, 'setting-system-group_data-kf_icon', 0),
(null, 1094, '', '客服图标', 'admin', '', '', '', '', '[]', 0, 1, 0, 1, '/admin/setting/system_group_data/kf_icon', '12/656/1094', 1, '', 0, 'setting-system-group_data-kf_icon', 0),
(null, 47, '', '系统日志管理员搜索条件', 'admin', '', '', 'api/admin/system/log/search_admin', 'GET', '[]', 0, 0, 0, 1, '', '25/65/47', 2, '', 0, '', 0),
(null, 585, '', '用户标签搜索列表', 'admin', '', '', 'api/admin/user/user_label', 'GET', '[]', 0, 0, 0, 1, '', '9/10/585', 2, '', 0, '', 0),
(null, 47, '', '系统日志', 'admin', '', '', 'api/admin/system/log', 'GET', '[]', 0, 0, 0, 1, '', '25/65/47', 2, '', 0, '', 0),
(null, 1103, '', '保存APP升级', 'admin', '', '', 'api/admin/setting/verison/save/<id>', 'POST', '[]', 0, 0, 0, 1, '', '12/1103', 2, '', 0, '', 0),
(null, 1103, '', '获取创建APP升级包表单', 'admin', '', '', 'api/admin/setting/verison/<id>', 'GET', '[]', 0, 0, 0, 1, '', '12/1103', 2, '', 0, '', 0),
(null, 1103, '', '删除APP升级包', 'admin', '', '', 'api/admin/setting/verison/<id>', 'DELETE', '[]', 0, 0, 0, 1, '', '12/1103', 2, '', 0, '', 0),
(null, 1103, '', '获取APP升级包列表', 'admin', '', '', 'api/admin/setting/verison', 'GET', '[]', 0, 0, 0, 1, '', '12/1103', 2, '', 0, '', 0),
(null, 1102, '', '站点统计', 'admin', '', '', 'api/admin/chat/statistics', 'GET', '[]', 0, 0, 0, 1, '', '165/1102', 2, '', 0, '', 0),
(null, 678, '', '删除自动回复', 'admin', '', '', 'api/admin/chat/reply/<id>', 'DELETE', '[]', 0, 0, 0, 1, '', '165/678', 2, '', 0, '', 0),
(null, 678, '', '保存自动回复', 'admin', '', '', 'api/admin/chat/reply/<id>', 'POST', '[]', 0, 0, 0, 1, '', '165/678', 2, '', 0, '', 0),
(null, 678, '', '获取自动回复表单', 'admin', '', '', 'api/admin/chat/reply/<id>', 'GET', '[]', 0, 0, 0, 1, '', '165/678', 2, '', 0, '', 0),
(null, 678, '', '自动回复列表', 'admin', '', '', 'api/admin/chat/reply', 'GET', '[]', 0, 0, 0, 1, '', '165/678', 2, '', 0, '', 0),
(null, 1101, '', '删除随机客服二维码', 'admin', '', '', 'api/admin/chat/qrcode/<id>', 'DELETE', '[]', 0, 0, 0, 1, '', '165/1101', 2, '', 0, '', 0),
(null, 1101, '', '保存随机客服二维码', 'admin', '', '', 'api/admin/chat/qrcode/<id>', 'POST', '[]', 0, 0, 0, 1, '', '165/1101', 2, '', 0, '', 0),
(null, 1101, '', '获取随机客服二维码表单', 'admin', '', '', 'api/admin/chat/qrcode/<id>', 'GET', '[]', 0, 0, 0, 1, '', '165/1101', 2, '', 0, '', 0),
(null, 1101, '', '获取随机客服二维码', 'admin', '', '', 'api/admin/chat/qrcode', 'GET', '[]', 0, 0, 0, 1, '', '165/1101', 2, '', 0, '', 0),
(null, 1100, '', '获取所有客服', 'admin', '', '', 'api/admin/chat/record_kefu', 'GET', '[]', 0, 0, 0, 1, '', '165/1100', 2, '', 0, '', 0),
(null, 1100, '', '查看所有聊天记录', 'admin', '', '', 'api/admin/chat/record', 'GET', '[]', 0, 0, 0, 1, '', '165/1100', 2, '', 0, '', 0),
(null, 1096, '', '保存客服图标上传配置', 'admin', '', '', 'api/admin/setting/config/kefu', 'POST', '[]', 0, 0, 0, 1, '', '12/656/1096', 2, '', 0, '', 0),
(null, 1008, '', '标签分类移动排序', 'admin', '', '', 'api/admin/user/label/move_cate', 'POST', '[]', 0, 0, 0, 1, '', '9/1008', 2, '', 0, '', 0),
(null, 1008, '', '标签移动排序', 'admin', '', '', 'api/admin/user/label/move', 'POST', '[]', 0, 1, 0, 1, '', '9/1008', 2, '', 0, '', 0);

-- 新增app在线升级表
CREATE TABLE `eb_app_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '更新摘要',
  `version_num` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '版本号',
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '下载地址',
  `info` varchar(1000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '更新详细内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `delete_time` timestamp NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='app在线升级';

CREATE TABLE `eb_site_statistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '网站来源',
  `path` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '来源网址',
  `ip` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'ip地址',
  `region` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '地区',
  `province` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '省份',
  `browser` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '浏览器',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='站点统计';

-- 2021/12/17
CREATE TABLE `eb_chat_service_group` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '组名',
 `sort` int(10) NOT NULL DEFAULT '0' COMMENT '排序',
 `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
 `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='客服分组';

ALTER TABLE `eb_chat_service` ADD `group_id` INT(10) NOT NULL DEFAULT '0' COMMENT '分组id' AFTER `user_id`;
