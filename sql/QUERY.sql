CREATE DATABASE `website-up-checker`;
USE `website-up-checker`; 
CREATE TABLE login_table (user_id varchar(30) NOT NULL, email varchar(255) NOT NULL, pass varchar(255) NOT NULL, UNIQUE (user_id, email));
SELECT * FROM login_table;
drop table login_table;

SELECT email from login_table WHERE email = 'parjanyamodi@gmail.cm';
drop table stats_table;
CREATE TABLE stats_table (user_id varchar(30), url_id varchar(255), time_stamp varchar(255), status_code varchar(255), layout_duration varchar(255), recalcstyle_duration varchar(255), script_duration varchar(255), task_duration varchar(255), screenshot varchar(255));
SELECT * FROM stats_table;

drop table url_table;
CREATE TABLE url_table (user_id varchar(30), url varchar(255), url_id varchar(255));
SELECT * FROM url_table;

insert into login_table values("fdedgf345345633423", "parjanyamodi@gmail.com", "admin", 1, 3456);
insert into login_table values("fdedgf345345693423", "contact@parjanyamodi.com", "admin", 1, 3456);
insert into login_table values("fdedgf345345697423", "parjanya.cs19@bmsce.ac.in", "admin", 1, 3456);

insert into url_table values("fdedgf345345633423", "https://parjanyamodi.com", "ihifvkjov65745654645");
insert into url_table values("fdedgf345345697423", "https://youtube.com", "ihifvkjov65745654646");
insert into url_table values("fdedgf345345693423", "https://instagram.com", "ihifvkjov65745657645");
insert into url_table values("fdedgf345345697423", "https://insram.com", "ihifvkjov60745657645");

SELECT url FROM url_table;