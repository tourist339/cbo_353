CREATE DATABASE IF NOT EXISTS cbo_addiction;
USE cbo_addiction;
CREATE TABLE IF NOT EXISTS login_credentials(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
    );
    
CREATE TABLE IF NOT EXISTS `customer` (
`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
`firstname` VARCHAR(255) NOT NULL,
`lastname` VARCHAR(255) NOT NULL,
`login_id` INT NOT NULL UNIQUE,
`addiction_type` INT NULL,
`addiction_description` VARCHAR(5000) NULL);
