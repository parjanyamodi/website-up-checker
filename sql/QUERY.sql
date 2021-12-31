CREATE DATABASE `website-up-checker`;
USE `website-up-checker`; 
CREATE TABLE login_table (user_id varchar(30), email varchar(255), pass varchar(255), verification integer, otp integer);
SELECT * FROM login_table;

CREATE TABLE stats_table (user_id varchar(30), url_id varchar(255), time_stamp varchar(255), layout_duration varchar(255), recalcstyle_duration varchar(255), script_duration varchar(255), task_duration varchar(255), screenshot varchar(255));
SELECT * FROM stats_table;

CREATE TABLE url_table (user_id varchar(30), url varchar(255), url_id varchar(255));
SELECT * FROM url_table;

insert into url_table values("fdedgf345345633423", "https://parjanyamodi.com", "ihifvkjov65745654645");
insert into url_table values("fdedgf345345693423", "https://instagram.com", "ihifvkjov65745657645");
insert into url_table values("fdedgf345345697423", "https://insram.com", "ihifvkjov60745657645");

SELECT url FROM url_table;