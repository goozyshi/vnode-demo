
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- login_user 表结构
-- ----------------------------
DROP TABLE IF EXISTS `login_user`;
CREATE TABLE `login_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- 新增记录
-- ----------------------------
BEGIN;
INSERT INTO `login_user` VALUES (1, 'admin', '91fe0e80d07390750d46ab6ed3a99316', 'admin', 'admin', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
INSERT INTO `login_user` VALUES (2, 'sam', 'f315515a2ce0a887dd1cc0e00cdca0e4', 'admin', 'sam', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
INSERT INTO `login_user` VALUES (3, 'nick', 'f315515a2ce0a887dd1cc0e00cdca0e4', 'editor', 'nick', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
COMMIT;