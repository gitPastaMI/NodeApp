-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nodeapp_dev
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_key` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `unit_weight` decimal(8,2) DEFAULT NULL,
  `total_weight` decimal(8,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'NEW',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int(11) NOT NULL DEFAULT '0',
  `UserId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `DeliveryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `OrderId` (`OrderId`),
  KEY `DeliveryId` (`DeliveryId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`DeliveryId`) REFERENCES `deliveries` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,'A-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,1,NULL),(2,'C-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,1,NULL),(3,'D-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,1,NULL),(4,'E-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,1,NULL),(5,'B-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,1,NULL),(6,'A-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,3,NULL),(7,'B-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,3,NULL),(8,'C-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,3,NULL),(9,'D-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,3,NULL),(10,'E-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,3,NULL),(11,'A-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,2,NULL),(12,'B-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,2,NULL),(13,'C-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,2,NULL),(14,'D-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,2,NULL),(15,'E-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,2,NULL),(16,'A-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,4,NULL),(17,'B-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,4,NULL),(18,'C-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,4,NULL),(19,'D-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,4,NULL),(20,'E-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,4,NULL),(21,'A-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,5,NULL),(22,'B-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,5,NULL),(23,'C-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,5,NULL),(24,'D-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,5,NULL),(25,'E-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,5,NULL),(26,'A-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,6,NULL),(27,'B-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,6,NULL),(28,'C-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,6,NULL),(29,'D-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,6,NULL),(30,'E-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,6,NULL),(31,'A-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,9,NULL),(32,'B-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,9,NULL),(33,'C-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,9,NULL),(34,'D-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,9,NULL),(35,'E-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,9,NULL),(36,'A-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,8,NULL),(37,'B-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,8,NULL),(38,'C-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,8,NULL),(39,'D-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,8,NULL),(40,'E-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,8,NULL),(41,'A-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,10,NULL),(42,'B-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,10,NULL),(43,'C-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,10,NULL),(44,'D-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,10,NULL),(45,'E-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,10,NULL),(46,'A-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,7,NULL),(47,'B-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,7,NULL),(48,'C-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,7,NULL),(49,'D-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,7,NULL),(50,'E-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,1,7,NULL),(51,'A-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,11,NULL),(52,'B-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,11,NULL),(53,'C-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,11,NULL),(54,'D-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,11,NULL),(55,'E-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,11,NULL),(56,'A-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,12,NULL),(57,'B-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,12,NULL),(58,'C-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,12,NULL),(59,'D-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,12,NULL),(60,'E-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,12,NULL),(61,'A-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,14,NULL),(62,'B-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,14,NULL),(63,'C-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,14,NULL),(64,'D-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,14,NULL),(65,'E-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,14,NULL),(66,'A-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,13,NULL),(67,'B-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,13,NULL),(68,'C-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,13,NULL),(69,'D-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,13,NULL),(70,'E-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,13,NULL),(71,'A-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,15,NULL),(72,'B-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,15,NULL),(73,'C-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,15,NULL),(74,'D-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,15,NULL),(75,'E-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,3,15,NULL),(76,'A-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,16,NULL),(77,'B-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,16,NULL),(78,'C-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,16,NULL),(79,'D-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,16,NULL),(80,'E-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,16,NULL),(81,'A-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,17,NULL),(82,'B-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,17,NULL),(83,'C-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,17,NULL),(84,'D-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,17,NULL),(85,'E-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,17,NULL),(86,'A-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,18,NULL),(87,'B-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,18,NULL),(88,'C-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,18,NULL),(89,'D-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,18,NULL),(90,'E-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,18,NULL),(91,'A-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,20,NULL),(92,'B-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,20,NULL),(93,'C-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,20,NULL),(94,'D-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,20,NULL),(95,'E-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,20,NULL),(96,'A-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,19,NULL),(97,'B-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,19,NULL),(98,'C-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,19,NULL),(99,'D-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,19,NULL),(100,'E-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,19,NULL),(101,'A-12345',4,2.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,21,NULL),(102,'B-12345',5,1.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,21,NULL),(103,'C-12345',1,5.00,5.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,21,NULL),(104,'D-12345',2,4.00,8.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,21,NULL),(105,'E-12345',3,3.00,9.00,'NEW','2019-06-19 13:05:50','2019-06-19 13:05:50',0,2,21,NULL);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 15:55:50
