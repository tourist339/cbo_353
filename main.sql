CREATE DATABASE IF NOT EXISTS cbo_addiction;
USE cbo_addiction;

CREATE TABLE IF NOT EXISTS login_credentials(
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
    );
    
    