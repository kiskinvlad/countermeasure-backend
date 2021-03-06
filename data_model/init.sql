CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;

-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
--
-- Table structure for table `CASE`
--
DROP TABLE IF EXISTS `CASE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CASE` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `matter_id` varchar(63) DEFAULT NULL,
  `name` varchar(127) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`case_id`),
  KEY `fk_CASE_ORGANIZATION1_idx` (`org_id`),
  CONSTRAINT `fk_CASE_ORGANIZATION1` FOREIGN KEY (`org_id`) REFERENCES `organization` (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CASE`
--

LOCK TABLES `CASE` WRITE;
/*!40000 ALTER TABLE `CASE` DISABLE KEYS */;
/*!40000 ALTER TABLE `CASE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORY`
--

DROP TABLE IF EXISTS `CATEGORY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CATEGORY` (
  `category_id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  `disputed_t1_ta_id` int(11) DEFAULT NULL,
  `name` varchar(63) NOT NULL,
  `taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `income_subject_to_gnp` decimal(15,2) unsigned zerofill NOT NULL DEFAULT '0000000000000.00',
  `other_amounts_payable` decimal(15,2) NOT NULL DEFAULT '0.00',
  `credits_applied_on_filing` decimal(15,2) NOT NULL DEFAULT '0.00',
  `federal_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  `provincial_non_refundable_tax_credits` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`category_id`),
  KEY `fk_CATEGORIES_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_CATEGORIES_CASE1` FOREIGN KEY (`case_id`) REFERENCES `case` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORY`
--

LOCK TABLES `CATEGORY` WRITE;
/*!40000 ALTER TABLE `CATEGORY` DISABLE KEYS */;
/*!40000 ALTER TABLE `CATEGORY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DISPUTED_T1_TA`
--

DROP TABLE IF EXISTS `DISPUTED_T1_TA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DISPUTED_T1_TA` (
  `disputed_t1_ta_id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  `taxpayer` varchar(45) NOT NULL,
  `year` decimal(15,2) NOT NULL DEFAULT '2017.00',
  `province` varchar(2) NOT NULL DEFAULT 'ON',
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
  CONSTRAINT `fk_TAXES_CASE1` FOREIGN KEY (`case_id`) REFERENCES `case` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DISPUTED_T1_TA`
--

LOCK TABLES `DISPUTED_T1_TA` WRITE;
/*!40000 ALTER TABLE `DISPUTED_T1_TA` DISABLE KEYS */;
/*!40000 ALTER TABLE `DISPUTED_T1_TA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORGANIZATION`
--

DROP TABLE IF EXISTS `ORGANIZATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ORGANIZATION` (
  `org_id` int(11) NOT NULL,
  `org_name` varchar(63) DEFAULT NULL,
  `first_name` varchar(63) DEFAULT NULL,
  `last_name` varchar(63) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(127) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORGANIZATION`
--

LOCK TABLES `ORGANIZATION` WRITE;
/*!40000 ALTER TABLE `ORGANIZATION` DISABLE KEYS */;
INSERT INTO `ORGANIZATION` VALUES (1,'kiskinLTD','vlad','kiskin','+380992192922','kiskinvlad@gmail.com',1,'2018-05-17 22:51:52');
/*!40000 ALTER TABLE `ORGANIZATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORGANIZATION_GUEST_PERMISSIONS`
--

DROP TABLE IF EXISTS `ORGANIZATION_GUEST_PERMISSIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ORGANIZATION_GUEST_PERMISSIONS` (
  `org_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  PRIMARY KEY (`org_id`,`user_id`,`case_id`),
  KEY `fk_ORGANIZATION_GUESTS_USER1_idx` (`user_id`),
  KEY `fk_ORGANIZATION_GUESTS_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_CASE1` FOREIGN KEY (`case_id`) REFERENCES `case` (`case_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_ORGANIZATION1` FOREIGN KEY (`org_id`) REFERENCES `organization` (`org_id`),
  CONSTRAINT `fk_ORGANIZATION_GUESTS_USER1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORGANIZATION_GUEST_PERMISSIONS`
--

LOCK TABLES `ORGANIZATION_GUEST_PERMISSIONS` WRITE;
/*!40000 ALTER TABLE `ORGANIZATION_GUEST_PERMISSIONS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORGANIZATION_GUEST_PERMISSIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SCENARIO`
--

DROP TABLE IF EXISTS `SCENARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SCENARIO` (
  `case_id` int(11) NOT NULL,
  `scenario_id` int(11) NOT NULL,
  `name` varchar(63) NOT NULL,
  `probability` float NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `taxable_income` decimal(15,2) NOT NULL DEFAULT '0.00',
  `taxes` decimal(15,2) NOT NULL DEFAULT '0.00',
  `penalties` decimal(15,2) NOT NULL DEFAULT '0.00',
  `interest` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`scenario_id`),
  KEY `fk_SCENARIO_CASE1_idx` (`case_id`),
  CONSTRAINT `fk_SCENARIO_CASE1` FOREIGN KEY (`case_id`) REFERENCES `case` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SCENARIO`
--

LOCK TABLES `SCENARIO` WRITE;
/*!40000 ALTER TABLE `SCENARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `SCENARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `userid` int(11) NOT NULL,
  `org_id` int(11) NOT NULL,
  `role_id` varchar(2) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_USER_ORGANIZATION_idx` (`org_id`),
  KEY `fk_USER_USER_ROLE1_idx` (`role_id`),
  CONSTRAINT `fk_USER_ORGANIZATION` FOREIGN KEY (`org_id`) REFERENCES `organization` (`org_id`),
  CONSTRAINT `fk_USER_USER_ROLE1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

-- MySQL Model changes post initiation 
-- Thrusday May 24, 2018  
-- Added by: Shawn Bedasrd on behalf of Jean-Phillippe Tremblay


ALTER TABLE `CASE` ADD COLUMN `updated_at` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW() after `name`; 
ALTER TABLE `CASE` ADD COLUMN `updated_by_name` VARCHAR(63) after `updated_at`; 
ALTER TABLE `CASE` ADD COLUMN `updated_by_id` int(11) after `updated_by_name`;
ALTER TABLE `CASE` ADD CONSTRAINT `fk_CASE_USER_UPDATEDBY`
    FOREIGN KEY (`updated_by_id`)
    REFERENCES `USER` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

-- Thrusday May 24, 2018  
-- Added by: Vlad Kiskin


ALTER TABLE CATEGORY ADD COLUMN order_position INT(11) DEFAULT NULL; 

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,1,'1','kiskinvlad@gmail.com','Admin','1994-11-10 22:00:00',1);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER_ROLE`
--

DROP TABLE IF EXISTS `USER_ROLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER_ROLE` (
  `role_id` char(2) NOT NULL,
  `role_name` varchar(63) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER_ROLE`
--

LOCK TABLES `USER_ROLE` WRITE;
/*!40000 ALTER TABLE `USER_ROLE` DISABLE KEYS */;
INSERT INTO `USER_ROLE` VALUES ('1','CA'),('2','OA'),('3','OM'),('4','OG');
/*!40000 ALTER TABLE `USER_ROLE` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-21 19:39:59
