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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_num` varchar(255) NOT NULL,
  `order_date` date NOT NULL,
  `order_status` varchar(255) DEFAULT 'NEW',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `version` int(11) NOT NULL DEFAULT '0',
  `UserId` int(11) DEFAULT NULL,
  `AccountId` int(11) NOT NULL,
  `ShiptoId` int(11) DEFAULT NULL,
  `BilltoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_num` (`order_num`),
  KEY `UserId` (`UserId`),
  KEY `AccountId` (`AccountId`),
  KEY `ShiptoId` (`ShiptoId`),
  KEY `BilltoId` (`BilltoId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`AccountId`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`ShiptoId`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`BilltoId`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'I8O9','2019-06-18','NEW','2019-06-18 14:39:57','2019-06-18 14:39:57',0,1,1,NULL,NULL),(2,'O9P0','2019-06-18','NEW','2019-06-18 14:39:57','2019-06-18 14:39:57',0,1,2,NULL,NULL),(3,'A1S2','2019-06-18','NEW','2019-06-18 14:39:57','2019-06-18 14:39:57',0,1,3,NULL,NULL),(4,'S2D3','2019-06-18','NEW','2019-06-18 14:39:59','2019-06-18 14:39:59',0,1,4,NULL,NULL),(5,'D3F4','2019-06-18','NEW','2019-06-18 14:39:59','2019-06-18 14:39:59',0,1,5,NULL,NULL),(6,'F4G5','2019-06-18','NEW','2019-06-18 14:39:59','2019-06-18 14:39:59',0,1,6,NULL,NULL),(7,'G5H6','2019-06-18','NEW','2019-06-18 14:39:59','2019-06-18 14:39:59',0,1,7,NULL,NULL),(8,'H6J7','2019-06-18','NEW','2019-06-18 14:40:00','2019-06-18 14:40:00',0,2,8,NULL,NULL),(9,'L9Z1','2019-06-18','NEW','2019-06-18 14:40:01','2019-06-18 14:40:01',0,2,11,NULL,NULL),(10,'J7K8','2019-06-18','NEW','2019-06-18 14:40:01','2019-06-18 14:40:01',0,2,9,NULL,NULL),(11,'Z1X2','2019-06-18','NEW','2019-06-18 14:40:01','2019-06-18 14:40:01',0,2,12,NULL,NULL),(12,'X2C3','2019-06-18','NEW','2019-06-18 14:40:02','2019-06-18 14:40:02',0,2,13,NULL,NULL),(13,'K8L9','2019-06-18','NEW','2019-06-18 14:40:01','2019-06-18 14:40:01',0,2,10,NULL,NULL),(14,'W2E3','2019-06-18','NEW','2019-06-18 14:40:03','2019-06-18 14:40:03',0,3,16,NULL,NULL),(15,'E3R4','2019-06-18','NEW','2019-06-18 14:40:03','2019-06-18 14:40:03',0,3,17,NULL,NULL),(16,'Q1W2','2019-06-18','NEW','2019-06-18 14:40:03','2019-06-18 14:40:03',0,3,15,NULL,NULL),(17,'C3V4','2019-06-18','NEW','2019-06-18 14:40:03','2019-06-18 14:40:03',0,2,14,NULL,NULL),(18,'R4T5','2019-06-18','NEW','2019-06-18 14:40:03','2019-06-18 14:40:03',0,3,18,NULL,NULL),(19,'T5Y6','2019-06-18','NEW','2019-06-18 14:40:04','2019-06-18 14:40:04',0,3,19,NULL,NULL),(20,'Y6U7','2019-06-18','NEW','2019-06-18 14:40:04','2019-06-18 14:40:04',0,3,20,NULL,NULL),(21,'U7I8','2019-06-18','NEW','2019-06-18 14:40:04','2019-06-18 14:40:04',0,3,21,NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 11:05:12