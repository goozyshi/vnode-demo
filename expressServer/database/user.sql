
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
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- 新增记录
-- ----------------------------
BEGIN;
INSERT INTO `login_user` VALUES (1, 'admin', 'f32df8bbc4e9b4f19d875ee3a0a480b6', 'admin', '白虎志', 'https://game.gtimg.cn/images/yxzj/coming/v2/skins/image/20190129/415b6e11e37216f67333d053237c6f08.jpg', '“据《白泽图》记载，上古之时，群妖现世，有五神兽化为凡人之姿，分守五方天地……”');

INSERT INTO `login_user` VALUES (2, 'sam', '6584a9a712efbdae9bd06822744e69ab', 'admin', '云间偶戏', 'https://game.gtimg.cn/images/yxzj/coming/v2/skins//image/20210107/16100000753013.jpg', '传说在云端之上，有一神奇之地，那里住的都是一些能乘云而飞的人，他们虽居于云端，却极具生活气息。会从各类奇美事物中获取灵感，以融入自己的服饰和表演，然后于每月云涌最盛之时，在云端拢云湖，筑高台，邀各住民一起来举办一场盛大的舞台秀。');

INSERT INTO `login_user` VALUES (3, 'guest', '7a0931ce9752ee77024adf0cffb3a686', 'guest', '遇见飞天', 'https://game.gtimg.cn/images/yxzj/coming/v2/skins/image/20181018/ff2d038ef59ae05491e33b8408a9c52d.jpg', '失落的沙州，被割裂的版图，流离的是人，不失散的是信仰。画师一生都在绘制佛窟的壁画，他把对人间祥和的期望都托付画笔。而今他年岁已高，这将是他画的最后一个窟。璎珞宝冠，朱色裙带，那个愿望，飞天会记住吗？');
COMMIT;