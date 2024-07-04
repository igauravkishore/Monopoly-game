-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: monopoly
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_name` varchar(255) NOT NULL,
  `card_description` text NOT NULL,
  `card_type` enum('Chance','Community Chest') NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (52,'Make general repairs on all your properties: For each house pay $25, for each hotel $100.','','Chance'),(53,'Pay poor tax of $15.','','Chance'),(55,'Take a trip to Reading Railroad: If you pass Go, collect $200.','','Chance'),(57,'Take a walk on the Boardwalk: Advance to Boardwalk.','','Chance'),(58,'You have been elected chairman of the board: Pay each player $50.','','Chance'),(61,'Your building loan matures: Collect $150.','','Chance'),(63,'You have won a crossword competition: Collect $100.','','Chance'),(70,'Advance to Go','Collect $200.','Chance'),(78,'Pay hospital fees of $100.','','Community Chest'),(79,'Receive $25 consultancy fee.','','Community Chest'),(80,'Go directly to Jail: Do not pass Go, do not collect $200.','','Community Chest'),(81,'Advance to Illinois Ave','If you pass Go, collect $200.','Chance'),(82,'Grand Opera Night: Collect $50 from every player for opening night seats.','','Community Chest'),(83,'Income tax refund: Collect $20.','','Community Chest'),(84,'Advance to St. Charles Place','If you pass Go, collect $200.','Chance'),(85,'From sale of stock, you get $50.','','Community Chest'),(86,'Holiday fund matures: Collect $100.','','Community Chest'),(87,'You inherit $100 from a relative.','','Community Chest'),(88,'Advance to Go: Collect $200.','Community Chest','Community Chest'),(89,'Bank error in your favor: Collect $200.','','Community Chest'),(90,'Bank pays you dividend of $50.','','Chance'),(91,'Doctor\'s fees: Pay $50.','','Community Chest'),(92,'Get out of Jail Free: This card may be kept until needed or sold.','','Chance'),(93,'Get out of Jail Free: This card may be kept until needed or sold.','','Community Chest'),(94,'Go back 3 spaces.','','Chance'),(95,'It\'s your birthday: Collect $10 from each player.','','Community Chest'),(96,'Go directly to Jail: Do not pass Go, do not collect $200.','','Chance'),(97,'Life insurance matures: Collect $100.','','Community Chest');
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-22  1:44:29
