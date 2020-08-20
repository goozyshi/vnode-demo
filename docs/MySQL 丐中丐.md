# MySQL 丐中丐

## MySQL 脚本基本组成

MySQL 脚本 有 一条或多条 MySQL 语句组成，文件后缀为`.sql`。

- 标识符
- 关键字
- 语句：MySQL语句是组成MySQL脚本的基本单位
- 函数：主要有`字符串函数、数学函数、日期时间函数、搜索函数、加密函数、信息函数。`

## MySQL 数据类型

-  数字类型

   - 整型：tinyint、smallint、mediumint、int、bigint
   -  浮点型：float、double、real、decimal
-  日期 ｜ 时间 类型：date、time、datetime、timestampe、year
-  字符串类型
   - 字符串：char、varchar
   - 文本：tinytext、text、mediumtext、longtext
   - 二进制（图片、音乐等文件）：tinyblob、blob、mediumblob、longblob

## mysql 常用命令

### 使用MySQL数据库

- 登录到MySQL

```bash
mysql -h [主机名] -u [用户名] -p
```

​	若密码存在, 输入密码登录, 不存在则直接按回车登录。

​	命令提示符会一直以 mysql> 加一个闪烁的光标等待命令的输入, 输入 `exit 或 quit `退出登录。

- 创建数据库

```mysql
create database [数据库名称] [其他选项]
```

​	例如创建一个book的数据库，为方便在命令提示符显示中文，指定数据库编码为gbk；

```mysql
create database book character set gbk;
```

​	查看已创建的数据库：`show  databases;`

```bash
+--------------------+
| Database           |
+--------------------+
| book               |
+--------------------+
1 rows in set (0.00 sec)
```

- 选择要操作的数据库

```mysql
// 登陆数据库时指定
mysql -u [用户名] -p -D [数据库名称]
// 登录后指定
use book;
```

- 创建表

`create table [表名称]([列声明]);`

以创建 students 表为例,

存放 学号(id)、姓名(name)、性别(sex)、年龄(age)、联系电话(tel) 这些内容。

```mysql
	// create_table.sql
	create table students
	(
			id int unsigned not null auto_increment primary key,
			name char(8) not null,
			sex char(4) not null,
			age tinyint unsigned not null,
			tel char(13) null default "-"
	);
```

较长的语句一般保存在sql脚本文件中，

`source create_table.sql`即可执行，非当前目录需指定sql文件路径。

​	查看以创建的表：` show tables;`

​	查看某个表的详细信息： `describe [表名]`

### 操作MySQL数据库

- 向表中插入数据

```mysq
insert into students values(NULL, "杨玉环", "女", 20, "17988883333");
insert into students values(NULL, "李白", "男", 23, "13544442222");
insert into students values(NULL, "孙悟空", "男", 51, "13544442222");
```

- 查询表中数据

  `select [列名称] from [表名称] [查询条件]`

  如，查询表 students中大于20岁的nam和age：`select name, age from students where students.age > 20;`

```bash
+-----------+-----+
| name      | age |
+-----------+-----+
| 李白      |  23 |
| 孙悟空    |  51 |
+-----------+-----+
2 rows in set (0.00 sec)
```

​		使用通配符`*`可查询表中所有列内容。`select * from students;`

- 更新表中数据

  `update [表名称] set [列名称]=[新值] where [更新条件];`

  更新孙悟空的年龄为23:

```bash
update students set age=23 where name="孙悟空";
```

- 删除表中的数据

  `delete from [表名称] where [删除条件];`

  删除id为2的行：delete from students where id = 2;

  删除表中所有数据：delete from students;

### 创建数据库后的修改

- 添加列

  `alter table [表名] add [列名] [列数据类型] after [插入位置];`

  在名为 age 的列后插入列 birthday: alter table students add birthday date after age;

- 修改列

  `alter table [表名] change [列名称] [列新名称] [新数据类型]`

  将表 tel 列改名为 telphone: alter table students change tel telphone char(13) default "-";

  将 name 列的数据类型改为 char(16): alter table students change name name char(16) not null;

- 删除列

  `alter table [表名] drop [列名];`

  删除 birthday 列: alter table students drop birthday;

- 重命名表

  `alter table [旧表名] rename [新表名];`

  重命名students 表为 studio: alter table students rename studio;

- 删除整张表

  `drop table [表名称];`

  删除students 表：drop table students;

- 删除数据库

  `drop database [数据库名称];`

  删除book数据库：drop database book;

## MySQL 跨表查询

> 图文并茂讲的很好：[mysql多表查询详解](https://www.zsythink.net/archives/1105)

查询表一students：`select * from students;`

```bash
+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 |
+----+-----------+-----+-----+-------------+
3 rows in set (0.00 sec)
```

查询表二studio：`select * from studio;`

```bash
+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+
|  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+
2 rows in set (0.00 sec)
```

### 交叉连接(cross join)

查询两张表： `select * from students, studio;`

 3 * 2 = 6 , 等价写法：`select * from students cross join studio;`

```bash
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         | id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|  1 | 杨玉环    | 女  |  20 | 17988883333 |  2 | 李信      | 男  |  20 | 13544442222 |
|  2 | 李白      | 男  |  23 | 13544442222 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |  2 | 李信      | 男  |  20 | 13544442222 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 |  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
6 rows in set (0.00 sec)
```

### 内连接：inner join

- 等值连接

查找两个表这种**id**相同的记录：`select * from students inner join studio on students.id=studio.id`

```bash
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         | id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
2 rows in set (0.00 sec)
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714796297-d4a80853-34b1-4f0a-b35f-9e6d132bfe9a.jpeg)

- 不等连接

查找【表studio】的id大于【表students】的id：`select * from studio s1 join students s2 on s1.id > s2.id`

`s1`为studio别名(`alias`)，`s2` 为students别名(`alias`)。

```bash
+----+--------+-----+-----+-------------+----+-----------+-----+-----+-------------+
| id | name   | sex | age | tel         | id | name      | sex | age | tel         |
+----+--------+-----+-----+-------------+----+-----------+-----+-----+-------------+
|  2 | 李信   | 男  |  20 | 13544442222 |  1 | 杨玉环    | 女  |  20 | 17988883333 |
+----+--------+-----+-----+-------------+----+-----------+-----+-----+-------------+
1 row in set (0.01 sec)
```

- 自连接

即把同一张表当作两张表连接起来。

`select * from studio s1 join studio s2 on s1.id = s2.id`

```bash
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         | id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
|  1 | 王昭君    | 女  |  23 | 17988883333 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李信      | 男  |  20 | 13544442222 |  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+----+-----------+-----+-----+-------------+
2 rows in set (0.00 sec)
```

### 外连接： left join 和 right join

外连接包括：

左外连接(`left outer join`， 也可简写成`left join`)，

右外连接(`right outer join`，可简写成`right join`)。

回顾下：

表students

```bash
+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 |
+----+-----------+-----+-----+-------------+
3 rows in set (0.04 sec)
```

表studio

```bash
+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+
|  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+
2 rows in set (0.00 sec)
```

- 左外连接

`select *  from students s1 left outer join studio s2 on s1.id = s2.id;`

```bash
+----+-----------+-----+-----+-------------+------+-----------+------+------+-------------+
| id | name      | sex | age | tel         | id   | name      | sex  | age  | tel         |
+----+-----------+-----+-----+-------------+------+-----------+------+------+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |    1 | 王昭君    | 女   |   23 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |    2 | 李信      | 男   |   20 | 13544442222 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 | NULL | NULL      | NULL | NULL | NULL        |
+----+-----------+-----+-----+-------------+------+-----------+------+------+-------------+
3 rows in set (0.00 sec)
```

对比内连接（`inner join`）可以发现，

左外连接多了由表students中id为3的记录和表studio的`空记录`组成的一行。

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714811832-fc051b0d-b34e-4486-a626-15950ad741df.jpeg)

- 右外连接

`select *  from students s1 right outer join studio s2 on s1.id = s2.id;`

使用"左外连接"或者"右外连接"时，有可能所有记录都符合连接条件，这时就不会出现使用"空记录"连接的情况。

```bash
+------+-----------+------+------+-------------+----+-----------+-----+-----+-------------+
| id   | name      | sex  | age  | tel         | id | name      | sex | age | tel         |
+------+-----------+------+------+-------------+----+-----------+-----+-----+-------------+
|    1 | 杨玉环    | 女   |   20 | 17988883333 |  1 | 王昭君    | 女  |  23 | 17988883333 |
|    2 | 李白      | 男   |   23 | 13544442222 |  2 | 李信      | 男  |  20 | 13544442222 |
+------+-----------+------+------+-------------+----+-----------+-----+-----+-------------+
2 rows in set (0.01 sec)
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714822162-c2071952-da33-4e35-87ea-7183f84f22e7.jpeg)

`select * from students s1 left join studio s2 on s1.id = s2.id where s2.id is NULL;`

```bash
+----+-----------+-----+-----+-------------+------+------+------+------+------+
| id | name      | sex | age | tel         | id   | name | sex  | age  | tel  |
+----+-----------+-----+-----+-------------+------+------+------+------+------+
|  3 | 孙悟空    | 男  |  51 | 13544442222 | NULL | NULL | NULL | NULL | NULL |
+----+-----------+-----+-----+-------------+------+------+------+------+------+
1 row in set (0.00 sec)
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714830736-3c70ec1c-a305-409f-b397-d3d9932d4979.jpeg)

`select * from students s1 right join studio s2 on s1.id < s2.id where s1.id is Null;`

```bash
+------+------+------+------+------+----+-----------+-----+-----+-------------+
| id   | name | sex  | age  | tel  | id | name      | sex | age | tel         |
+------+------+------+------+------+----+-----------+-----+-----+-------------+
| NULL | NULL | NULL | NULL | NULL |  1 | 王昭君    | 女  |  23 | 17988883333 |
+------+------+------+------+------+----+-----------+-----+-----+-------------+
1 row in set (0.00 sec)
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714847449-990aa50f-403a-494a-b5e3-74dc47edf12b.jpeg)

- 全连接

mysql中不能直接使用"full join"实现全连接，不过，我们可以变相的实现"全连接",

在mysql中，我们可以使用`"left join"、"union"、"right join"`的组合实现所谓的"全连接"。

`select * from students s1 left join studio s2 on s1.id = s2.id union select * from students s1 right join studio s2 on s1.id = s2.id;`

```bash
+------+-----------+------+------+-------------+------+-----------+------+------+-------------+
| id   | name      | sex  | age  | tel         | id   | name      | sex  | age  | tel         |
+------+-----------+------+------+-------------+------+-----------+------+------+-------------+
|    1 | 杨玉环    | 女   |   20 | 17988883333 |    1 | 王昭君    | 女   |   23 | 17988883333 |
|    2 | 李白      | 男   |   23 | 13544442222 |    2 | 李信      | 男   |   20 | 13544442222 |
|    3 | 孙悟空    | 男   |   51 | 13544442222 | NULL | NULL      | NULL | NULL | NULL        |
+------+-----------+------+------+-------------+------+-----------+------+------+-------------+
3 rows in set (0.00 sec)
```

![](https://cdn.nlark.com/yuque/0/2020/jpeg/608421/1594714857818-457667a9-25b7-4f71-9776-caf7ea217e23.jpeg)

## 联合查询：union 和 union all

当使用`union`连接两个查询语句时，两个语句查询出的**字段数量必须相同**，否则无法使用union进行联合查询。

`select * from students union select * from studio;`

```bash
+----+-----------+-----+-----+-------------+
| id | name      | sex | age | tel         |
+----+-----------+-----+-----+-------------+
|  1 | 杨玉环    | 女  |  20 | 17988883333 |
|  2 | 李白      | 男  |  23 | 13544442222 |
|  3 | 孙悟空    | 男  |  51 | 13544442222 |
|  1 | 王昭君    | 女  |  23 | 17988883333 |
|  2 | 李信      | 男  |  20 | 13544442222 |
+----+-----------+-----+-----+-------------+
5 rows in set (0.00 sec)
```

使用`union all`进行联合查询时，如果两条sql语句存在重复的数据，`重复的记录会被展示出来`。

- 跨库查询

查询库database1 的表 table1 和 库databese2 的表table2中age列大于12的值：

```bash
SELECT *
 FROM database1.table1 T1
 WHERE T1.age > 12
UNION
SELECT *
 FROM database2.table1 T2
 WHERE T2.age > 12;
```