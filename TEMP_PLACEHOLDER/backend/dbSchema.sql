-- ************************************** `candidate`

CREATE TABLE `candidate`
(
 `id`           int NOT NULL AUTO_INCREMENT ,
 `name`         varchar(30) NOT NULL ,
 `email`        varchar(45) NOT NULL ,
 `dob`          date NOT NULL ,
 `phone`        bigint NOT NULL ,
 `zipcode`      bigint NOT NULL ,
 `ssn`          bigint NOT NULL ,
 `license_no`   varchar(20) NOT NULL ,
 `created_on`   date NOT NULL ,
 `location`     varchar(30) NOT NULL ,
 `package`      varchar(20) NULL ,
 `status`       enum('CLEAR','CONSIDER') NULL ,
 `adjudication` enum('ADVERSE ACTION','ENGAGE') NULL ,

PRIMARY KEY (`id`)
);

-- ************************************** `adverse_action`

CREATE TABLE `adverse_action`
(
 `id`           int NOT NULL AUTO_INCREMENT ,
 `candidate_id` int NOT NULL ,
 `pre_notice`   date NULL ,
 `post_notice`  date NULL ,
 `status`       enum('SCHEDULED','DISPUTE','UNDELIVERED','PENDING') NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`candidate_id`),
CONSTRAINT `FK_7` FOREIGN KEY `FK_1` (`candidate_id`) REFERENCES `candidate` (`id`)
);




-- ************************************** `candidate_court_search`

CREATE TABLE `candidate_court_search`
(
 `id`           int NOT NULL AUTO_INCREMENT ,
 `search_date`  date NOT NULL ,
 `candidate_id` int NOT NULL ,
 `court_search_id`    tinyint NOT NULL ,
 `status`       enum('CLEAR','CONSIDER') NULL ,

PRIMARY KEY (`id`),
KEY `FK_1` (`candidate_id`),
CONSTRAINT `FK_2` FOREIGN KEY `FK_1` (`candidate_id`) REFERENCES `candidate` (`id`),
KEY `FK_2` (`search_id`),
CONSTRAINT `FK_3` FOREIGN KEY `FK_2` (`search_id`) REFERENCES `court_search` (`id`)
);


-- ************************************** `court_search`

CREATE TABLE `court_search`
(
 `id`   tinyint NOT NULL AUTO_INCREMENT ,
 `name` varchar(45) NOT NULL ,

PRIMARY KEY (`id`)
);


-- ************************************** `user`

CREATE TABLE `user`
(
 `id`       int NOT NULL AUTO_INCREMENT ,
 `email`    varchar(45) NOT NULL ,
 `password` varchar(20) NOT NULL ,
 `otp`      bigint NULL ,

PRIMARY KEY (`id`)
);





