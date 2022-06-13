


CREATE TABLE IF NOT EXISTS `users` (
	`userID` INT auto_increment NOT NULL,
  `username` varchar(500) NOT NULL,
  `userEmail` varchar(500) unique NOT NULL,
   `userPassword` varchar(10) NOT NULL,
  `isAdmin` BOOL NOT NULL,
  `isSeller` BOOL NOT NULL,
  PRIMARY KEY (`userID`)
);

CREATE TABLE IF NOT EXISTS `sellers` (
	`sellerID` INT  NOT NULL ,
  `sellerName` varchar(500) NOT NULL,
  `sellerEmail` varchar(500) ,
   `sellerLogo` varchar(500) NOT NULL,
 `sellerRating` INT  NOT NULL,
       `numReviews` INT  NOT NULL,
  PRIMARY KEY (`sellerID`)

);
ALTER TABLE sellers
ADD FOREIGN KEY (ID) REFERENCES users(userID);

CREATE TABLE IF NOT EXISTS `products` (
	`productID` INT auto_increment NOT NULL,
  `productName` varchar(200) NOT NULL,
  `productImage` varchar(500) NOT NULL,
   `productBrand` varchar(200) NOT NULL,
  `productCategory` varchar(100) NOT NULL,
  `productDescription` varchar(500) NOT NULL,
  `productPrice` INT  NOT NULL,
  `countInstock` INT NOT NULL,
    `productRating` INT  NOT NULL,
       `numReviews` INT  NOT NULL,
         `sellerID` INT NOT NULL,
  PRIMARY KEY (`ID`)

);

ALTER TABLE products
ADD FOREIGN KEY (seller) REFERENCES sellers(sellerID);


CREATE TABLE reviewPosts (
	`postID` INT auto_increment NOT NULL,
	`userID` Int NOT NULL,
	`productID` Int NOT NULL,
	`description` varchar(500) NOT NULL,	
    `rating` INT  NOT NULL,
	  PRIMARY KEY (`postID`)
);

ALTER TABLE reviewPosts
ADD FOREIGN KEY (`user`) REFERENCES users(userID),
ADD FOREIGN KEY (`product`) REFERENCES products(productID);

 
CREATE TABLE orders(

		`orderID` INT auto_increment NOT NULL,
		 `shippingName` varchar(200) NOT NULL,
		 `shippingAddress` varchar(200) NOT NULL,
		`paymentMethod` varchar(200) NOT NULL,
		`totalPrice` INT NOT NULL,
		`user` Int NOT NULL,
		`isDelivered` BOOL DEFAULT FALSE,
		 PRIMARY KEY (`orderID`));
ALTER TABLE orders
ADD FOREIGN KEY (`user`) REFERENCES users(userID);



 
CREATE TABLE orderItems (
		`itemID` INT auto_increment NOT NULL,
		`orderID` INT  NOT NULL,
		`productID` INT  NOT NULL,
		`qty` INT  NOT NULL,
		`itemPrice` INT  NOT NULL,
 PRIMARY KEY (`itemID`));

ALTER TABLE orderItems 
ADD FOREIGN KEY (`orderID`) REFERENCES orders(orderID),
ADD FOREIGN KEY (`productID`) REFERENCES products(productID);
