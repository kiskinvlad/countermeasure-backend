/*
 Navicat Premium Data Transfer

 Source Server         : MySql
 Source Server Type    : MySQL
 Source Server Version : 50722
 Source Host           : localhost
 Source Database       : mydb

 Target Server Type    : MySQL
 Target Server Version : 50722
 File Encoding         : utf-8

 Date: 06/07/2018 09:00:34 AM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `CASE`
-- ----------------------------
DROP TABLE IF EXISTS `CASE`;
CREATE TABLE `CASE` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `matter_id` varchar(63) DEFAULT NULL,
  `name` varchar(127) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by_name` varchar(63) DEFAULT NULL,
  `updated_by_id` int(11) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`case_id`),
  KEY `fk_CASE_ORGANIZATION1_idx` (`org_id`),
  KEY `fk_CASE_USER_UPDATEDBY` (`updated_by_id`),
  CONSTRAINT `fk_CASE_ORGANIZATION1` FOREIGN KEY (`org_id`) REFERENCES `ORGANIZATION` (`org_id`),
  CONSTRAINT `fk_CASE_USER_UPDATEDBY` FOREIGN KEY (`updated_by_id`) REFERENCES `USER` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `CASE`
-- ----------------------------
BEGIN;
INSERT INTO `CASE` VALUES ('1', '1', '6315', 'Mikes Shipping Inc - T2 Dispute', '2018-05-28 23:19:13', 'CounterTax Admin', '1', 'Two tax years re-assessed, one in dispute: (2015)'), ('2', '1', '3434', 'Mkies Shipping Inc - GST / GST Dispute', '2018-05-28 23:07:47', 'Organization Admin', '2', 'Seven tax years re-assessed, three in dispute: (2011, 2012, 2014)'), ('3', '1', '4444', 'Ronald & Michell Davis T1 Dispute', '2018-05-28 23:07:47', 'Organization Admin', '2', 'Six tax years re-assessed, two in dispute: (2016, 2017)'), ('4', '1', '942', 'Joe and Jane Taxpayer T1 Dispute', '2018-05-28 23:19:13', 'CounterTax Admin', '1', 'Five tax years re-assessed, one in dispute: (2016,)');
COMMIT;

-- ----------------------------
--  Table structure for `CATEGORY`
-- ----------------------------
DROP TABLE IF EXISTS `CATEGORY`;
CREATE TABLE `CATEGORY` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_id` int(11) NOT NULL,
  `disputed_t1_ta_id` int(11) DEFAULT NULL,
  `name` varchar(63) NOT NULL,
  `taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `income_subject_to_gnp` decimal(15,2) NOT NULL DEFAULT '0.00',
  `other_amounts_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `credits_applied_on_filing` decimal(15,2) NOT NULL DEFAULT '0.00',
  `federal_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `provincial_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `other_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `order_position` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `fk_CATEGORIES_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_CATEGORIES_CASE1` FOREIGN KEY (`case_id`) REFERENCES `CASE` (`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `DISPUTED_T1_TA`
-- ----------------------------
DROP TABLE IF EXISTS `DISPUTED_T1_TA`;
CREATE TABLE `DISPUTED_T1_TA` (
  `disputed_t1_ta_id` int(11) NOT NULL AUTO_INCREMENT,
  `case_id` int(11) NOT NULL,
  `taxpayer` varchar(45) NOT NULL,
  `year` int(4) NOT NULL DEFAULT '2017',
  `province` varchar(2) NOT NULL DEFAULT 'AB',
  `federal_tax_applies` tinyint(1) NOT NULL DEFAULT '1',
  `provincial_tax_applies` tinyint(1) NOT NULL DEFAULT '1',
  `filing_date` date DEFAULT NULL,
  `estimated_interest_date` date DEFAULT NULL,
  `TP_taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_income_subject_to_gnp` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_net_federal_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_net_provincial_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_federal_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_provincial_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_other_amounts_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_total_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_credits_applied_on_filing` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_balance_before_penalties_and_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_gross_negligence_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_late_filing_penalty_rate` float NOT NULL DEFAULT '0',
  `TP_late_filing_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_other_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_total_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_total_tax_and_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_initial_payment` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_estimated_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `TP_estimated_interest_rate` float NOT NULL DEFAULT '0',
  `TP_total_debt` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_income_subject_to_gnp` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_net_federal_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_net_provincial_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_federal_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_provincial_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_other_amounts_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_total_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_credits_applied_on_filing` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_balance_before_penalties_and_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_gross_negligence_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_late_filing_penalty_rate` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_late_filing_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_other_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_total_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_total_tax_and_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_initial_payment` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_estimated_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `GP_estimated_interest_rate` float NOT NULL DEFAULT '0',
  `GP_total_debt` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_income_subject_to_gnp` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_net_federal_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_net_provincial_tax` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_federal_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_provincial_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_other_amounts_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_total_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_credits_applied_on_filing` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_balance_before_penalties_and_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_gross_negligence_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_late_filing_penalty_rate` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_late_filing_penalty` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_other_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_total_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_total_tax_and_penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_initial_payment` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_estimated_interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `DIFF_estimated_interest_rate` float NOT NULL DEFAULT '0',
  `DIFF_total_debt` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`disputed_t1_ta_id`),
  KEY `fk_TAXES_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_TAXES_CASE1` FOREIGN KEY (`case_id`) REFERENCES `CASE` (`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `DISPUTED_T1_TA`
-- ----------------------------
BEGIN;
INSERT INTO `DISPUTED_T1_TA` VALUES ('1', '1', 'Jane', '2018', 'PE', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('2', '1', 'John', '2018', 'BC', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('3', '2', 'Henry', '2018', 'NS', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('4', '2', 'Billy', '2018', 'PE', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('5', '3', 'Linda', '2018', 'NS', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('6', '3', 'Angela', '2018', 'PE', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00'), ('7', '4', 'Mirian', '2018', 'BC', '3', '2', '2018-01-10', '2018-06-10', '324.00', '674.00', '222.00', '10.00', '20.00', '30.00', '40.00', '50.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00');
COMMIT;

-- ----------------------------
--  Table structure for `ORGANIZATION`
-- ----------------------------
DROP TABLE IF EXISTS `ORGANIZATION`;
CREATE TABLE `ORGANIZATION` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(63) DEFAULT NULL,
  `first_name` varchar(63) DEFAULT NULL,
  `last_name` varchar(63) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(127) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `member_limit` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `ORGANIZATION`
-- ----------------------------
BEGIN;
INSERT INTO `ORGANIZATION` VALUES ('1', 'kiskinLTD', 'vlad', 'kiskin', '+123456789000', 'kiskinvlad@gmail.com', '1', '2018-05-17 18:51:52', 10), ('2', 'phOrg', 'Jean', 'Philippe', '+123456789000', 'phorg@gmail.com', '1', '2018-05-17 18:51:52', 10), ('3', 'shOrg', 'Alex', 'Frankel', '+123456789000', 'alexf@gmail.com', '3', '2018-05-17 18:51:52', 10), ('4', 'jamesOrg', 'James', 'Rodriguez', '+123456789000', 'james@gmail.com', '2', '2018-05-17 18:51:52', 10);
COMMIT;

-- ----------------------------
--  Table structure for `ORGANIZATION_GUEST_PERMISSIONS`
-- ----------------------------
DROP TABLE IF EXISTS `ORGANIZATION_GUEST_PERMISSIONS`;
CREATE TABLE `ORGANIZATION_GUEST_PERMISSIONS` (
  `org_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  PRIMARY KEY (`org_id`,`user_id`,`case_id`),
  KEY `fk_ORGANIZATION_GUESTS_USER1_idx` (`user_id`),
  KEY `fk_ORGANIZATION_GUESTS_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_CASE1` FOREIGN KEY (`case_id`) REFERENCES `CASE` (`case_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_ORGANIZATION1` FOREIGN KEY (`org_id`) REFERENCES `ORGANIZATION` (`org_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_USER1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `ORGANIZATION_GUEST_PERMISSIONS`
-- ----------------------------
BEGIN;
INSERT INTO `ORGANIZATION_GUEST_PERMISSIONS` VALUES ('1', '4', '1');
COMMIT;

-- ----------------------------
--  Table structure for `SCENARIO`
-- ----------------------------
DROP TABLE IF EXISTS `SCENARIO`;
CREATE TABLE `SCENARIO` (
  `case_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `probability` float NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `taxes` decimal(15,2) NOT NULL DEFAULT '0.00',
  `penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  `order_position` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`scenario_id`),
  KEY `fk_SCENARIO_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_SCENARIO_CASE1` FOREIGN KEY (`case_id`) REFERENCES `CASE` (`case_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `SCENARIO`
-- ----------------------------
BEGIN;
INSERT INTO `SCENARIO` VALUES ('1', '1', 'Scenario A', '123.349', 'Scenario A', '38.00', '10.00', '100.00', '7.00', '1'), ('2', '2', 'Scenario A', '1.2304', 'Scenario A', '38.00', '9.00', '50.00', '4.00', '2'), ('3', '3', 'Scenario B', '4.423', 'Scenario B', '38.00', '2.00', '30.00', '7.00', '3'), ('4', '4', 'Scenario C', '61.234', 'description ddd', '38.00', '8.00', '20.00', '4.00', '4');
COMMIT;

-- ----------------------------
--  Table structure for `USER`
-- ----------------------------
DROP TABLE IF EXISTS `USER`;
CREATE TABLE `USER` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `role_id` varchar(2) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` tinyint(1) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_USER_ORGANIZATION_idx` (`org_id`),
  KEY `fk_USER_USER_ROLE1_idx` (`role_id`),
  CONSTRAINT `fk_USER_ORGANIZATION` FOREIGN KEY (`org_id`) REFERENCES `ORGANIZATION` (`org_id`),
  CONSTRAINT `fk_USER_USER_ROLE1` FOREIGN KEY (`role_id`) REFERENCES `USER_ROLE` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `USER`
-- ----------------------------
BEGIN;
INSERT INTO `USER` VALUES ('1', '1', 'CA', 'cadmin@gmail.com', 'password', '1994-11-10 17:00:00', '1', 'CounterTax', 'Admin', null), ('2', '1', 'OA', 'oadmin@gmail.com', 'password', '2018-05-20 17:00:00', '1', 'Organization', 'Admin', null), ('3', '1', 'OM', 'omember@gmail.com', 'password', '2018-05-20 17:00:00', '1', 'Organization', 'Member', null), ('4', '1', 'OG', 'oguest@gmail.com', 'password', '2018-05-20 17:00:00', '1', 'Organization', 'Guest', null);
COMMIT;

-- ----------------------------
--  Table structure for `USER_ROLE`
-- ----------------------------
DROP TABLE IF EXISTS `USER_ROLE`;
CREATE TABLE `USER_ROLE` (
  `role_id` char(2) NOT NULL,
  `role_name` varchar(63) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `USER_ROLE`
-- ----------------------------
BEGIN;
INSERT INTO `USER_ROLE` VALUES ('CA', 'CounterTax Admin'), ('OA', 'Organization Admin'), ('OG', 'Organization Guest'), ('OM', 'Organization Member');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
