-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: abcash
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `questoes`
--

DROP TABLE IF EXISTS `questoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questoes` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questoes`
--

LOCK TABLES `questoes` WRITE;
/*!40000 ALTER TABLE `questoes` DISABLE KEYS */;
INSERT INTO `questoes` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10);
/*!40000 ALTER TABLE `questoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas`
--

DROP TABLE IF EXISTS `respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respostas` (
  `id_usuario` int NOT NULL,
  `id_questao` int NOT NULL,
  `resposta` varchar(500) NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id_usuario`,`id_questao`),
  KEY `id_questao` (`id_questao`),
  CONSTRAINT `respostas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `respostas_ibfk_2` FOREIGN KEY (`id_questao`) REFERENCES `questoes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
INSERT INTO `respostas` VALUES (1,1,'Ele sai logo da cama.','2021-05-10 19:03:50'),(1,2,'Acorda mais cedo e vai caminhando para o serviço.','2021-05-10 19:03:50'),(1,3,'Optar por se organizar e fazer sua própria marmita. ','2021-05-10 19:03:50'),(1,4,'Usar o tempo para navegar em suas redes.','2021-05-10 19:03:50'),(1,5,'Não comprar o produto, pois não está precisando.','2021-05-10 19:03:50'),(1,6,'Ele pega um sanduíche de carne.','2021-05-10 19:03:50'),(1,7,'Não está muito preocupado com o trabalho.','2021-05-10 19:03:50'),(1,8,'Visita lojas comparando modelos e preços.','2021-05-10 19:03:50'),(1,9,'Ele planeja poupar uma quantia boa todos os meses.','2021-05-10 19:03:50'),(1,10,'Coloca o despertador um pouco mais cedo.','2021-05-10 19:03:50'),(2,1,'Ele sai logo da cama.','2021-07-14 12:40:07'),(2,2,'Acorda mais cedo e vai caminhando para o serviço.','2021-07-14 12:40:07'),(2,3,'Optar por se organizar e fazer sua própria marmita. ','2021-07-14 12:40:07'),(2,4,'Ir para a sala de descanso com seu livro e dar uma lida.','2021-07-14 12:40:07'),(2,5,'Economizar para comprar a vista mais pra frente.','2021-07-14 12:40:07'),(2,6,'Ele pega um sanduíche de carne.','2021-07-14 12:40:07'),(2,7,'Trabalha ao menos 30 min por dia no trabalho.','2021-07-14 12:40:07'),(2,8,'Decide ignorar ele por enquanto.','2021-07-14 12:40:07'),(2,9,'Ele planeja poupar uma quantia boa todos os meses.','2021-07-14 12:40:07'),(2,10,'Já arruma tudo que vai precisar para amanhã.','2021-07-14 12:40:07'),(3,1,'Ele sai logo da cama.','2021-07-20 19:25:54'),(3,2,'Acorda mais cedo e vai caminhando para o serviço.','2021-07-20 19:25:54'),(3,3,'Optar por se organizar e fazer sua própria marmita. ','2021-07-20 19:25:54'),(3,4,'Ir para a sala de descanso com seu livro e dar uma lida.','2021-07-20 19:25:54'),(3,5,'Economizar para comprar a vista mais pra frente.','2021-07-20 19:25:54'),(3,6,'Ele pega um sanduíche de frango.','2021-07-20 19:25:54'),(3,7,'Trabalha o máximo possível no próximo tempo livre.','2021-07-20 19:25:54'),(3,8,'Decide ignorar ele por enquanto.','2021-07-20 19:25:54'),(3,9,'Ele planeja poupar uma quantia boa todos os meses.','2021-07-20 19:25:54'),(3,10,'Já arruma tudo que vai precisar para amanhã.','2021-07-20 19:25:54'),(4,1,'Ele sai logo da cama.','2021-07-20 19:26:51'),(4,2,'Pegar o transporte coletivo para ir ao serviço. ','2021-07-20 19:26:51'),(4,3,'Optar por se organizar e fazer sua própria marmita. ','2021-07-20 19:26:51'),(4,4,'Ir para a sala de descanso com seu livro e dar uma lida.','2021-07-20 19:26:51'),(4,5,'Economizar para comprar a vista mais pra frente.','2021-07-20 19:26:51'),(4,6,'Ele pega um sanduíche de frango.','2021-07-20 19:26:51'),(4,7,'Trabalha ao menos 30 min por dia no trabalho.','2021-07-20 19:26:51'),(4,8,'Decide ignorar ele por enquanto.','2021-07-20 19:26:51'),(4,9,'Ele planeja poupar uma quantia boa todos os meses.','2021-07-20 19:26:51'),(4,10,'Já arruma tudo que vai precisar para amanhã.','2021-07-20 19:26:51'),(5,1,'Ele sai logo da cama.','2021-08-26 19:09:58'),(5,2,'Acorda mais cedo e vai caminhando para o serviço.','2021-08-26 19:09:58'),(5,3,'Ir no restaurante próximo ao local do trabalho.','2021-08-26 19:09:58'),(5,4,'Ir para a sala de descanso com seu livro e dar uma lida.','2021-08-26 19:09:58'),(5,5,'Economizar para comprar a vista mais pra frente.','2021-08-26 19:09:58'),(5,6,'Ele pega um sanduíche de frango.','2021-08-26 19:09:58'),(5,7,'Trabalha o máximo possível no próximo tempo livre.','2021-08-26 19:09:58'),(5,8,'Decide ignorar ele por enquanto.','2021-08-26 19:09:58'),(5,9,'Ele planeja poupar uma quantia boa todos os meses.','2021-08-26 19:09:58'),(5,10,'Já arruma tudo que vai precisar para amanhã.','2021-08-26 19:09:58');
/*!40000 ALTER TABLE `respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Teste'),(2,'lorenzo costa'),(3,'Gabriel'),(4,'Paola'),(5,'Gabriela');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-28 12:38:22
