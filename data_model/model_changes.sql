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


-- Thrusday May 24, 2018
-- Added by: Shannon Lui
ALTER TABLE `USER` ADD COLUMN `first_name` VARCHAR(63) after `password`;
ALTER TABLE `USER` ADD COLUMN `last_name` VARCHAR(63) after `first_name`;
ALTER TABLE `USER` ADD COLUMN `phone` VARCHAR(15) after `last_name`;


-- Tuesday May 29, 2018
-- Added by: Vlad Kiskin
ALTER TABLE CATEGORY ADD COLUMN other_penalties DECIMAL(15,2) DEFAULT NULL;

-- Thrusday June 4, 2018
-- Added by: Vlad Kiskin
ALTER TABLE SCENARIO ADD COLUMN order_position INT(11) DEFAULT NULL;

-- Tuesday June 5, 2018
-- Added by: Shannon Lui
ALTER TABLE ORGANIZATION ADD COLUMN member_limit INT(11) NOT NULL DEFAULT 0;
