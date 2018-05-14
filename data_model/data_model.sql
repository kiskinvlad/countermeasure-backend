-- MySQL Script generated by MySQL Workbench
-- Mon May 14 14:07:06 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`ORGANIZATION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`ORGANIZATION` ;

CREATE TABLE IF NOT EXISTS `mydb`.`ORGANIZATION` (
  `org_id` INT NOT NULL,
  `org_name` VARCHAR(63) NULL,
  `first_name` VARCHAR(63) NULL,
  `last_name` VARCHAR(63) NULL,
  `phone` VARCHAR(15) NULL,
  `email` VARCHAR(127) NULL,
  `enabled` TINYINT(1) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`org_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USER_ROLE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`USER_ROLE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`USER_ROLE` (
  `role_id` CHAR(2) NOT NULL,
  `role_name` VARCHAR(63) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`USER` ;

CREATE TABLE IF NOT EXISTS `mydb`.`USER` (
  `user_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  `role_id` VARCHAR(2) NOT NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` TINYINT(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_USER_ORGANIZATION_idx` (`org_id` ASC),
  INDEX `fk_USER_USER_ROLE1_idx` (`role_id` ASC),
  CONSTRAINT `fk_USER_ORGANIZATION`
    FOREIGN KEY (`org_id`)
    REFERENCES `mydb`.`ORGANIZATION` (`org_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_USER_ROLE1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`USER_ROLE` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `mydb`.`CASE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CASE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CASE` (
  `case_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  `matter_id` VARCHAR(63) NULL,
  `name` VARCHAR(127) NULL,
  `description` MEDIUMTEXT NULL,
  PRIMARY KEY (`case_id`),
  INDEX `fk_CASE_ORGANIZATION1_idx` (`org_id` ASC),
  CONSTRAINT `fk_CASE_ORGANIZATION1`
    FOREIGN KEY (`org_id`)
    REFERENCES `mydb`.`ORGANIZATION` (`org_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`DISPUTED_T1_TA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`DISPUTED_T1_TA` ;

CREATE TABLE IF NOT EXISTS `mydb`.`DISPUTED_T1_TA` (
  `disputed_t1_ta_id` INT NOT NULL,
  `case_id` INT NOT NULL,
  `taxpayer` VARCHAR(45) NOT NULL,
  `year` DECIMAL(15,2) NOT NULL DEFAULT 2017,
  `province` VARCHAR(2) NOT NULL DEFAULT 'ON',
  `federal_tax_applies` TINYINT(1) NOT NULL DEFAULT 1,
  `provincial_tax_applies` TINYINT(1) NOT NULL DEFAULT 1,
  `filing_date` DATE NULL,
  `estimated_interest_date` DATE NULL,
  `TP_taxable_income` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_income_subject_to_gnp` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_net_federal_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_net_provincial_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_federal_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_provincial_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_other_amounts_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_total_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_credits_applied_on_filing` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_balance_before_penalties_and_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_gross_negligence_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_late_filing_penalty_rate` FLOAT NOT NULL DEFAULT 0,
  `TP_late_filing_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_other_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_total_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_total_tax_and_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_initial_payment` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_estimated_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `TP_estimated_interest_rate` FLOAT NOT NULL DEFAULT 0,
  `TP_total_debt` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_taxable_income` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_income_subject_to_gnp` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_net_federal_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_net_provincial_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_federal_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_provincial_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_other_amounts_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_total_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_credits_applied_on_filing` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_balance_before_penalties_and_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_gross_negligence_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_late_filing_penalty_rate` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_late_filing_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_other_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_total_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_total_tax_and_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_initial_payment` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_estimated_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `GP_estimated_interest_rate` FLOAT NOT NULL DEFAULT 0,
  `GP_total_debt` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_taxable_income` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_income_subject_to_gnp` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_net_federal_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_net_provincial_tax` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_federal_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_provincial_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_other_amounts_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_total_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_credits_applied_on_filing` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_balance_before_penalties_and_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_gross_negligence_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_late_filing_penalty_rate` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_late_filing_penalty` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_other_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_total_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_total_tax_and_penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_initial_payment` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_estimated_interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `DIFF_estimated_interest_rate` FLOAT NOT NULL DEFAULT 0,
  `DIFF_total_debt` DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`disputed_t1_ta_id`),
  INDEX `fk_TAXES_CASE1_idx` (`case_id` ASC),
  UNIQUE INDEX `payor_year_prove_UNIQUE` (`taxpayer` ASC, `year` ASC, `province` ASC),
  CONSTRAINT `fk_TAXES_CASE1`
    FOREIGN KEY (`case_id`)
    REFERENCES `mydb`.`CASE` (`case_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CATEGORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`CATEGORY` ;

CREATE TABLE IF NOT EXISTS `mydb`.`CATEGORY` (
  `category_id` INT NOT NULL,
  `case_id` INT NOT NULL,
  `disputed_t1_ta_id` INT NULL,
  `name` VARCHAR(63) NOT NULL,
  `taxable_income` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `income_subject_to_gnp` DECIMAL(15,2) ZEROFILL NOT NULL DEFAULT 0,
  `other_amounts_payable` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `credits_applied_on_filing` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `federal_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `provincial_non_refundable_tax_credits` DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`category_id`),
  INDEX `fk_CATEGORIES_CASE1_idx` (`case_id` ASC),
  CONSTRAINT `fk_CATEGORIES_CASE1`
    FOREIGN KEY (`case_id`)
    REFERENCES `mydb`.`CASE` (`case_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SCENARIO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`SCENARIO` ;

CREATE TABLE IF NOT EXISTS `mydb`.`SCENARIO` (
  `case_id` INT NOT NULL,
  `scenario_id` INT NOT NULL,
  `name` VARCHAR(63) NOT NULL,
  `probability` FLOAT NOT NULL DEFAULT 0,
  `description` TEXT NOT NULL,
  `taxable_income` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `taxes` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `penalties` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `interest` DECIMAL(15,2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`scenario_id`),
  INDEX `fk_SCENARIO_CASE1_idx` (`case_id` ASC),
  CONSTRAINT `fk_SCENARIO_CASE1`
    FOREIGN KEY (`case_id`)
    REFERENCES `mydb`.`CASE` (`case_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`GUEST_CASE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`GUEST_CASE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`GUEST_CASE` (
  `case_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`case_id`, `user_id`),
  INDEX `fk_GUEST_CASE_CASE1_idx` (`case_id` ASC),
  INDEX `fk_GUEST_CASE_USER1_idx` (`user_id` ASC),
  CONSTRAINT `fk_GUEST_CASE_CASE1`
    FOREIGN KEY (`case_id`)
    REFERENCES `mydb`.`CASE` (`case_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GUEST_CASE_USER1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
