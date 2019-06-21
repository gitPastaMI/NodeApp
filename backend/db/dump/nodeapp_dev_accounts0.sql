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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `version` int(11) NOT NULL DEFAULT '0',
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'Alfred Hitchcock','Vicolo Corto','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(2,'Buster Keaton','Corso Ateneo','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(3,'Howard Hawks','Viale Monterosa','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(4,'Federico Fellini','Corso Raffaello','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(5,'John Huston','Corso Magellano','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(6,'Ernst Lubitsch','Viale Traiano','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(7,'Woody Allen','Corso Impero','Milano','2019-06-19 13:05:48','2019-06-19 13:05:48',0,1),(8,'Orson Welles','Vicolo Stretto','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(9,'Martin Scorsese','Viale Vesuvio','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(10,'Ingmar Bergman','Piazza Università','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(11,'Steven Spielberg','Piazza Dante','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(12,'Luis Buñuel','Largo Colombo','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(13,'Robert Altman','Piazza Giulio Cesare','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(14,'Vincente Minnelli','Largo Augusto','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,3),(15,'John Ford','Bastioni Gran Sasso','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(16,'Akira Kurosawa','Via Accademia','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(17,'Frank Capra','Via Verdi','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(18,'Jean Renoir','Via Marco Polo','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(19,'D.W. Griffith','Viale Costantino','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(20,'George Cukor','Via Roma','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2),(21,'Francis Ford Coppola','Viale dei Giardini','Milano','2019-06-19 13:05:49','2019-06-19 13:05:49',0,2);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-19 15:55:49
