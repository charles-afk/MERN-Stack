CREATE TABLE IF NOT EXISTS `User_T` (
    `user_id` INT(45) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(34) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(24) NOT NULL,
    `last_name` VARCHAR(24) NOT NULL,
    `email` VARCHAR(24) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `User_IDX` (`user_id`) USING BTREE,
    CONSTRAINT `User_PK` PRIMARY KEY (`user_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Discount_T` (
    `discount_id` INT(45) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NOT NULL,
    `description` TEXT(255) DEFAULT NULL,
    `discount_percent` DECIMAL(10) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `Discount_IDX` (`discount_id`) USING BTREE,
    CONSTRAINT `Discount_PK` PRIMARY KEY (`discount_id`)   
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Store_T` (
    `store_id` INT(45) NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(45) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `zipcode` INT(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `storeLevel` VARCHAR(45) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `Store_IDX` (`store_id`) USING BTREE,
    CONSTRAINT `Store_PK` PRIMARY KEY (`store_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ContactMe_T` (
    `contact_id` INT(45) NOT NULL AUTO_INCREMENT,
    `store_id` INT(45),
    `name` VARCHAR(45),
    `email` VARCHAR(45),
    `description` TEXT(255),
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `Contact_PK` PRIMARY KEY (`contact_id`),
    CONSTRAINT `Contact_FK` FOREIGN KEY (`store_id`) REFERENCES `Store_T`(`store_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Employee_T`(
    `employee_id` INT(45) NOT NULL AUTO_INCREMENT,
    `store_id` INT(45),
    `username` VARCHAR(34) NOT NULL,
    `password` VARCHAR(34) NOT NULL,
    `first_name` VARCHAR(24),
    `last_name` VARCHAR(24),
    `address` VARCHAR(24) DEFAULT NULL,
    `phone` INT(10) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `Employee_IDX` (`employee_id`) USING BTREE,
    CONSTRAINT `Employee_PK` PRIMARY KEY (`employee_id`),
    CONSTRAINT `Employee_FK` FOREIGN KEY (`store_id`) REFERENCES `Store_T`(`store_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `OrderDetails_T` (
    `details_id` INT(45) NOT NULL AUTO_INCREMENT,
    `user_id` INT(45),
    `employee_id` INT(45) DEFAULT NULL,
    `amountTotal` DECIMAL(45) DEFAULT NULL,
    `shippingPrice` INT(45),
    `taxPrice` INT(45),
    `itemsPrice` INT(45),
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `OrderDetails_IDX` (`details_id`) USING BTREE,
    UNIQUE KEY `CustomerOrder_IDX` (`details_id`,`user_id`) USING BTREE,
    CONSTRAINT `OrderDetails_PK` PRIMARY KEY (`details_id`),
    CONSTRAINT `OrderDetails_FK1` FOREIGN KEY (`employee_id`) REFERENCES `Employee_T`(`employee_id`),
    CONSTRAINT `OrderDetails_FK2` FOREIGN KEY (`user_id`) REFERENCES `User_T`(`user_id`)
        ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ShipmentInfo_T` (
    `address_id` INT(45) NOT NULL AUTO_INCREMENT,
    `details_id` INT(45),
    `address` TEXT(255) NOT NULL,
    `city` VARCHAR(25) NOT NULL,
    `state` VARCHAR(25) NOT NULL,
    `zipcode` INT (23) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `ShipmentInfo_IDX` (`address_id`) USING BTREE,
    CONSTRAINT `ShipmentInfo_PK` PRIMARY KEY (`address_id`),
    CONSTRAINT `ShipmentInfo_FK` FOREIGN KEY (`details_id`) REFERENCES `OrderDetails_T`(`details_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `PaymentDetails_T` (
    `payment_id` INT(45) NOT NULL AUTO_INCREMENT,
    `details_id` INT(45),
    `amount` INT(45) DEFAULT NULL,
    `provider` VARCHAR(45) NOT NULL,
    `card` INT(45),
    `expiration` INT(5),
    `secure` INT(45),
    `name` VARCHAR(45),
    `status` VARCHAR(45) NOT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `PaymentDetails_PK` PRIMARY KEY (`payment_id`),
    CONSTRAINT `PaymentDetails_FK` FOREIGN KEY (`details_id`) REFERENCES `OrderDetails_T`(`details_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Inventory_T` (
    `inventory_id` INT (45) NOT NULL AUTO_INCREMENT,
    `store_id` INT(45) DEFAULT NULL,
    `quantity` INT(45) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` DATETIME NOT NULL,
    UNIQUE KEY `Inventory_IDX` (`inventory_id`) USING BTREE,
    CONSTRAINT `Inventory_PK` PRIMARY KEY (`inventory_id`),
    CONSTRAINT `Inventory_FK` FOREIGN KEY (`store_id`) REFERENCES `Store_T`(`store_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `Product_T` (
    `product_id` INT (45) NOT NULL AUTO_INCREMENT,
    `inventory_id` INT(45)DEFAULT NULL,
    `name` VARCHAR(55) NOT NULL,
    `UPC` VARCHAR(50) NOT NULL,
    `description` TEXT(255) DEFAULT NULL,
    `rating` INT(1) DEFAULT NULL,
    `series` VARCHAR(55) NOT NULL,
    `condition` VARCHAR(55) NOT NULL,
    `language` VARCHAR(55) NOT NULL,
    `format` VARCHAR(55) NOT NULL,
    `publisher` VARCHAR(55) NOT NULL,
    `picture` VARCHAR(55) NOT NULL,
    `price` INT(55) NOT NULL,
    `instock` VARCHAR(55) NOT NULL,
    `discount_id` INT(45) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `Product_IDX` (`product_id`) USING BTREE,
    UNIQUE KEY `Product_IDX2` (`product_id`,`UPC`) USING BTREE,
    CONSTRAINT `Product_PK` PRIMARY KEY (`product_id`),
    CONSTRAINT `Product_FK1` FOREIGN KEY (`discount_id`) REFERENCES `Discount_T`(`discount_id`)
        ON DELETE SET NULL ON UPDATE SET NULL,
    CONSTRAINT `Product_FK2` FOREIGN KEY (`inventory_id`) REFERENCES `Inventory_T`(`inventory_id`)
        ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `OrderItems_T` (
    `items_id` INT(45) NOT NULL AUTO_INCREMENT,
    `details_id` INT(45),
    `product_id` INT(45),
    `quantity` INT (45),
    `created_at` DATETIME NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `OrderItems_PK` PRIMARY KEY (`items_id`),
    CONSTRAINT `OrderItems_FK1` FOREIGN key (`details_id`) REFERENCES `OrderDetails_T`(`details_id`),
    CONSTRAINT `OrderItems_FK2` FOREIGN KEY (`product_id`) REFERENCES `Product_T`(`product_id`)
) ENGINE=InnoDB;

INSERT INTO `Store_T` (`address`,`state`,`city`,`zipcode`,`email`,`storeLevel`) VALUES
('456 Horizon Ave', 'CA', 'Builderville', '12435', 'BaffledBrook@mail.com', 'Warehouse');
INSERT INTO `Employee_T` (`store_id`,`username`,`password`) VALUES
('1','computer','pass');
INSERT INTO `Product_T` (`name`, `UPC`, `description`, `rating`, `series`, `condition`, `language`, `format`, `publisher`, `picture`, `price`, `instock`) VALUES
('The Amazing Spider Man Issue 1', '23124432', 'The Fantastic Four run into the Spider Man!', 5, 'Spider-Man', 'Used', 'English', 'Paper', 'Marvel', '/spiderman_01.jpg', 60, 'Yes'),
('The Amazing Spider Man Issue 2', '86573457', 'The Vultures rampage in Manhattan begins. Can Spidey take down the avian menace?', 5, 'Spider-Man', 'Used', 'English', 'Paper', 'Marvel', '/spiderman_02.jpg', 50, 'Yes'),
('The Amazing Spider Man Issue 3', '87634325', 'Witness the birth of one of Spider-Mans greatest enemies, the grotesque Dr. Octopus!', 5, 'Spider-Man', 'Used', 'English', 'Paper', 'Marvel', '/spiderman_03.jpg', 30, 'Yes'),
('The Amazing Spider Man Issue 4', '32487634', 'Spider-Man must contend with the villainous might of Sandman. But worst of all, Spidey has to deal with the dreaded...J. Jonah Jameson!', 5, 'Spider-Man', 'Used', 'English', 'Paper', 'Marvel', '/spiderman_04.jpg', 70, 'Yes'),
('The Amazing Spider Man Issue 5', '53241235', 'Everyones favorite neighborhood Spider-Man engages the Fantastic Fours most powerful enemy, Doctor Doom!', 5, 'Spider-Man', 'Used', 'English', 'Paper', 'Marvel', '/spiderman_05.jpg', 80, 'Yes'),
('The Brave and The Bold Issue 28', '31234325', 'The Justice League Fight the powerful Staro!', 4, 'The Brave and the Bold', 'Used', 'Spanish', 'eBook', 'DC Comics', '/jc-league.jpg', 20, 'Yes'),
('The Brave and The Bold Issue 29', '42634667', 'The Justice League Faceoff Against Xotar!', 4, 'The Brave and the Bold', 'Used', 'English', 'Hard Cover', 'DC Comics', '/jc-league_29.jpg', 50, 'Yes'),
('The Brave and The Bold Issue 30', '32465323', 'A mysterious enemy plagues The Justice League cauing their powers to fail!', 4, 'The Brave and the Bold', 'Used', 'Korean', 'eBook', 'DC Comics', '/jc-league_30.jpg', 20, 'Yes'),
('The Avengers Issue 1', '24334566', 'Thor, Hulk, Iron Man and others come together to form Earths Mightiest Heroes. Avengers Assemble!', 5, 'The Avengers', 'New', 'Spanish', 'Paper', 'Marvel','/Avengers_Vol_0_1.jpg', 89, 'Yes'),
('The Avengers Issue 2', '38729063', 'One of the Avengers is not who he seems! An alien agitator fragments the team almost as soon as its begun!', 4, 'The Avengers', 'Used', 'English', 'Paper', 'Marvel','/Avengers_Vol_0_2.jpg', 64, 'Yes'),
('The Avengers Issue 3', '64373245', 'Earths mightiest heroes must face Marvels mightiest malcontents: the Hulk and the Sub-Mariner, teaming up for the first time! Featuring the Fantastic Four and the X-Men!', 5, 'The Avengers', 'Used', 'English', 'Paper', 'Marvel','/Avengers_Vol_0_3.jpg', 70, 'Yes'),
('The Avengers Issue 4', '23124432', 'Captain America joins The Avengers!', 3, 'The Avengers', 'Used', 'English', 'Paper', 'Marvel', '/Avengers_Vol_0_4.jpg', 30, 'No'),
('The Avengers Issue 5', '54313424', 'The Lava Men have a burning desire to conquer the world, and its up to the Avengers to stop them! Guest-starring the Hulk!', 4,'The Avengers', 'Used', 'English', 'Paper', 'Marvel', '/Avengers_Vol_0_5.jpg', 60, 'No'),
('The Avengers Issue 8', '12343252', 'The Avengers face off against Kang!', 5, 'The Avengers', 'New', 'English', 'Paper', 'Marvel', '/kang-comic.jpg', 75, 'Yes');