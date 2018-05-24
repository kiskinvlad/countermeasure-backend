-- MySQL Model changes post initiation 
-- Thrusday May 24, 2018  
-- Added by: Shawn Bedasrd on behalf of Jean-Phillippe Tremblay


ALTER TABLE CASE ADD COLUMN updated_at DATE (40) NOT NULL DEFAULT NOW() ON UPDATE NOW()after name; 
ALTER TABLE CASE ADD COLUMN updated_by_name VARCHAR(63) after updated_at; 
ALTER TABLE CASE ADD COLUMN updated_by_id INT after updated_by_name;
ALTER TABLE CASE ADD CONSTRAINT `fk_CASE_USER_UPDATEDBY`
    FOREIGN KEY (`updated_by_id`)
    REFERENCES `USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;

-- Thrusday May 24, 2018  
-- Added by: Vlad Kiskin


ALTER TABLE CATEGORY ADD COLUMN order_position INT(11) DEFAULT NULL; 
