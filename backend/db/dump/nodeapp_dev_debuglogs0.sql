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
-- Table structure for table `debuglogs`
--

DROP TABLE IF EXISTS `debuglogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `debuglogs` (
  `log_date` date NOT NULL,
  `log_object` varchar(45) NOT NULL,
  `log_msg` varchar(100) NOT NULL,
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8456 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debuglogs`
--

LOCK TABLES `debuglogs` WRITE;
/*!40000 ALTER TABLE `debuglogs` DISABLE KEYS */;
INSERT INTO `debuglogs` VALUES ('2019-06-19','finalizeForecast','BEGIN',8361),('2019-06-19','finalizeForecast','new group 18',8362),('2019-06-19','finalizeForecast','forecast C-12345 - 10',8363),('2019-06-19','finalizeForecast','orderitem :C-12345 - 10 --- C-12345 - 3',8364),('2019-06-19','finalizeForecast','delivery NEW 80 - 20 - 0',8365),('2019-06-19','finalizeForecast','add orderitem 98to delivery 80 qty:3 7',8366),('2019-06-19','finalizeForecast','orderitem :C-12345 - 7 --- C-12345 - 4',8367),('2019-06-19','finalizeForecast','delivery NEW 81 - 12 - 0',8368),('2019-06-19','finalizeForecast','add orderitem 53to delivery 81 qty:4 3',8369),('2019-06-19','finalizeForecast','orderitem :C-12345 - 3 --- C-12345 - 4',8370),('2019-06-19','finalizeForecast','orderitem :C-12345 - 3 --- C-12345 - 4',8371),('2019-06-19','finalizeForecast','orderitem :C-12345 - 3 --- C-12345 - 5',8372),('2019-06-19','finalizeForecast','orderitem :C-12345 - 3 --- C-12345 - 5',8373),('2019-06-19','finalizeForecast','delete forecast 96 C-12345 - 10',8374),('2019-06-19','finalizeForecast','END',8375);
/*!40000 ALTER TABLE `debuglogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 15:55:47
