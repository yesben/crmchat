
ALTER TABLE `eb_chat_service` ADD `is_app` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '是否为APP登陆' AFTER `client_id`;

ALTER TABLE `eb_chat_user` ADD `remark_nickname` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '备注昵称' AFTER `nickname`;

CREATE TABLE `eb_chat_auto_reply` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '关键词',
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '内容',
  `user_id` int(10) NOT NULL DEFAULT '0' COMMENT '所属用户',
  `appid` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '所属appid',
  `sort` INT(10) NOT NULL DEFAULT '0' COMMENT '排序,越靠前,越是能被自会回复到',
  `add_time` int(10) NOT NULL DEFAULT '0' COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='自动回复';

ALTER TABLE `eb_chat_service` ADD `auto_reply` TINYINT(1) NOT NULL DEFAULT '0' COMMENT '自动回复' AFTER `client_id`;
