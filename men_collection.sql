-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: men_collection
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderItems`
--

DROP TABLE IF EXISTS `orderItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderItems` (
  `itemID` int NOT NULL AUTO_INCREMENT,
  `orderID` int NOT NULL,
  `productID` int NOT NULL,
  `qty` int NOT NULL,
  `price` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`itemID`),
  KEY `orderID` (`orderID`),
  KEY `productID` (`productID`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderItems`
--

LOCK TABLES `orderItems` WRITE;
/*!40000 ALTER TABLE `orderItems` DISABLE KEYS */;
INSERT INTO `orderItems` VALUES (1,23,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(2,24,4,1,78,'Nike Slim Pant','/images/p4.jpg'),(3,35,2,1,100,'Adidas Fit Shirt','/images/p2.jpg'),(4,35,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(5,36,4,1,78,'Nike Slim Pant','/images/p4.jpg'),(6,37,4,1,78,'Nike Slim Pant','/images/p4.jpg'),(7,38,2,1,100,'Adidas Fit Shirt','/images/p2.jpg'),(8,39,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(9,40,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(10,41,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(11,42,2,1,100,'Adidas Fit Shirt','/images/p2.jpg'),(12,43,2,1,100,'Adidas Fit Shirt','/images/p2.jpg'),(13,44,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(14,45,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(15,46,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(16,47,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(17,47,4,1,78,'Nike Slim Pant','/images/p4.jpg'),(18,48,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(19,49,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(20,50,1,1,120,'Nike Slim Shirt','/images/p1.jpg'),(21,51,6,1,139,'Adidas Fit Pant','/images/p6.jpg'),(22,52,1,1,120,'Nike Slim Shirt','/images/p1.jpg');
/*!40000 ALTER TABLE `orderItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `paymentMethod` varchar(200) NOT NULL,
  `totalPrice` int NOT NULL,
  `userID` int NOT NULL,
  `isDelivered` tinyint(1) DEFAULT '0',
  `itemsPrice` int DEFAULT NULL,
  `shippingPrice` int DEFAULT NULL,
  `taxPrice` varchar(100) DEFAULT NULL,
  `seller` int DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT '0',
  `paidAt` timestamp NULL DEFAULT NULL,
  `deliveredAt` timestamp NULL DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderID`),
  KEY `user` (`userID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(2,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(3,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(4,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(5,'PayPal',100,7,0,78,10,'11.7',6,NULL,NULL,NULL,'2022-06-12 09:56:43'),(6,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-12 09:56:43'),(7,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(8,'PayPal',639,7,0,556,0,'83.4',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(9,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(10,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(11,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-12 09:56:43'),(12,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-12 09:56:43'),(13,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-12 09:56:43'),(14,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-12 09:56:43'),(15,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(16,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(17,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(18,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(19,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(20,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(21,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(22,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(23,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(24,'PayPal',228,7,0,198,0,'29.7',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(25,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(26,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(27,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(28,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(29,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(30,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(31,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(32,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(33,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(34,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(35,'PayPal',275,7,0,239,0,'35.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(36,'PayPal',100,7,0,78,10,'11.7',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(37,'PayPal',100,7,0,78,10,'11.7',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(38,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(39,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(40,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(41,'PayPal',160,7,0,139,0,'20.85',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(42,'PayPal',125,7,0,100,10,'15',5,NULL,NULL,NULL,'2022-06-13 09:56:43'),(43,'PayPal',125,7,1,100,10,'15',18,NULL,NULL,'2022-06-12 17:00:00','2022-06-13 09:56:43'),(44,'PayPal',138,7,0,120,0,'18',6,NULL,NULL,NULL,'2022-06-13 09:56:43'),(45,'PayPal',160,7,1,139,0,'20.85',18,NULL,NULL,'2022-06-13 17:00:00','2022-06-13 09:56:43'),(46,'PayPal',138,7,0,120,0,'18',6,0,NULL,NULL,'2022-06-13 09:56:43'),(47,'PayPal',228,18,1,198,0,'29.7',6,1,'2022-06-12 17:00:00','2022-06-12 17:00:00','2022-06-13 09:56:43'),(48,'PayPal',138,18,1,120,0,'18',18,1,'2022-06-12 17:00:00','2022-06-12 17:00:00','2022-06-13 09:56:43'),(49,'PayPal',138,2,1,120,0,'18',18,1,'2022-06-13 17:00:00','2022-06-12 17:00:00','2022-06-13 09:56:43'),(50,'Stripe',138,18,1,120,0,'18',18,0,NULL,'2022-06-12 17:00:00','2022-06-13 13:06:27'),(51,'Stripe',160,26,0,139,0,'20.85',5,1,'2022-06-13 17:00:00',NULL,'2022-06-14 08:25:20'),(52,'PayPal',138,7,1,120,0,'18',18,1,'2022-06-13 17:00:00','2022-06-13 17:00:00','2022-06-14 09:14:55');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentResult`
--

DROP TABLE IF EXISTS `paymentResult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentResult` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderID` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentResult`
--

LOCK TABLES `paymentResult` WRITE;
/*!40000 ALTER TABLE `paymentResult` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentResult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `brand` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` int NOT NULL,
  `countInstock` int NOT NULL,
  `rating` int DEFAULT NULL,
  `numReviews` int DEFAULT NULL,
  `seller` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `reviews` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `products_FK` (`seller`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nike Slim Shirt','/images/p1.jpg','Nike','Shirts','high quality product',120,10266,4,10,'18',NULL),(2,'Adidas Fit Shirt','/images/p2.jpg','Adidas','Shirts','high quality product',100,20,4,10,'5',NULL),(3,'Lacoste Free Shirt','/images/p3.jpg','Lacoste','Shirts','high quality product',220,0,5,7,'17',NULL),(4,'Nike Slim Pant','/images/p4.jpg','Nike','Pants','high quality product',78,15,2,14,'18',NULL),(6,'Adidas Fit Pant','/images/p6.jpg','Adidas','Pants','high quality product',139,12,3,15,'5',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewPosts`
--

DROP TABLE IF EXISTS `reviewPosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviewPosts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `product` int NOT NULL,
  `comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rating` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `user` (`user`),
  KEY `product` (`product`),
  CONSTRAINT `reviewposts_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`ID`),
  CONSTRAINT `reviewposts_ibfk_2` FOREIGN KEY (`product`) REFERENCES `products` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewPosts`
--

LOCK TABLES `reviewPosts` WRITE;
/*!40000 ALTER TABLE `reviewPosts` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviewPosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sellers` (
  `ID` int NOT NULL,
  `name` varchar(500) NOT NULL,
  `logo` varchar(500) NOT NULL,
  `rating` int NOT NULL,
  `numReviews` int NOT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `users` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` VALUES (4,'Puma','/images/logo1.png',3,4),(5,'Adidas','/images/logo5.png',5,1),(7,'Lee','/images/logo2.png',4,5),(18,'Nike','/images/logo3.png',5,2),(19,'Lacoste','/images/logo4.png',4,2);
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingAddress`
--

DROP TABLE IF EXISTS `shippingAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingAddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(200) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalCode` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `fullName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shippingAddress_FK` (`orderID`),
  CONSTRAINT `shippingAddress_FK` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingAddress`
--

LOCK TABLES `shippingAddress` WRITE;
/*!40000 ALTER TABLE `shippingAddress` DISABLE KEYS */;
INSERT INTO `shippingAddress` VALUES (1,'aa','aa','aa','aaa',19,'aaa'),(2,'aa','aa','aa','aaa',20,'aaa'),(3,'aa','aa','aa','aaa',21,'aaa'),(4,'aa','aa','aa','aaa',24,'aaa'),(5,'aa','aa','aa','aaa',25,'aaa'),(6,'aa','aa','aa','aaa',26,'aaa'),(7,'aa','aa','aa','aaa',27,'aaa'),(8,'aa','aa','aa','aaa',28,'aaa'),(9,'aa','aa','aa','aaa',29,'aaa'),(10,'aa','aa','aa','aaa',30,'aaa'),(11,'aa','aa','aa','aaa',31,'aaa'),(12,'aa','aa','aa','aaa',32,'aaa'),(13,'aa','aa','aa','aaa',33,'aaa'),(14,'aa','aa','aa','aaa',34,'aaa'),(15,'aa','aa','aa','aaa',35,'aaa'),(16,'aa','aa','aa','aaa',36,'aaa'),(17,'aa','aa','aa','aaa',37,'aaa'),(18,'aa','aa','aa','aaa',38,'aaa'),(19,'aa','aa','aa','aaa',39,'aaa'),(20,'aa','aa','aa','aaa',40,'aaa'),(21,'aa','aa','aa','aaa',41,'aaa'),(22,'aa','aa','aa','aaa',42,'aaa'),(23,'aa','aa','aa','aaa',43,'aaa'),(24,'ss','ss','ss','ss',44,'sd'),(25,'ss','ss','ss','ss',45,'sd'),(26,'ss','ss','ss','ss',46,'sd'),(27,'ASSVVCC','HCM','ASSVVCC','Vietnam',47,'Nhi Bui'),(28,'ss','ss','ss','ss',48,'ss'),(29,'ss','ss','ss','ss',49,'ss'),(30,'sss','s','sss','ssss',50,'sss'),(31,'sadasd','sadasd','sadasd','asdasd',51,'asds'),(32,'ASSVVCC','ss','ASSVVCC','ID',52,'Nhi Bui');
/*!40000 ALTER TABLE `shippingAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(10) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isSeller` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Admin','admin@mail.com','1234',1,0),(3,'Nhi','nhi@mail.com','1234',0,1),(4,'Puma','Puma@mail.com','1234',0,1),(5,'Adidas','adidas@mail.com','1234',0,1),(6,'Noname','no@mail.com','1234',0,1),(7,'Lee','lee@mail.com','123456',0,1),(8,'nhi','aa@aa.com','1234',0,0),(9,'CHAN','nhi.bui@elsanow.io','aaa',0,0),(12,'CHAN','nhi.bui22@elsanow.io','aaa',0,0),(13,'CHAN','nhi.bui223@elsanow.io','aaa',0,0),(14,'nhi','nhi.bui+1@elsanow.io','aa',0,0),(15,'nhi111','nhi.bui+100@elsanow.io','aa',0,0),(16,'nhi','nhi.bui+1004@elsanow.io','aa',0,1),(17,'Lacoste','lacoste@mai.com','1234',0,1),(18,'Nike333333','nike@mail.com','1234',0,1),(19,'Lacoste','lacoste@mail.com','1234',0,1),(20,'undefined','new@email.com','undefined',0,0),(21,'undefined','nhi.bui@aa.com','undefined',0,0),(24,'undefined','[object Object]','undefined',0,0),(26,'SSSS','admin22222@example.com','123456',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'men_collection'
--

--
-- Dumping routines for database 'men_collection'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-15 15:13:06
