-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: saep_db
-- ------------------------------------------------------
-- Server version	8.0.45

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

DROP DATABASE IF EXISTS saep_db;
CREATE DATABASE saep_db;
USE saep_db;

--
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id_Agendamento` int NOT NULL auto_increment,
  `data_aula` date DEFAULT NULL,
  `personal` varchar(45) DEFAULT NULL,
  `Alunos_id_Alunos` int NOT NULL,
  `Plano_treino_id_Plano_treino` int NOT NULL,
  PRIMARY KEY (`id_Agendamento`),
  KEY `fk_Agendamento_Alunos1_idx` (`Alunos_id_Alunos`),
  KEY `fk_Agendamento_Plano_treino1_idx` (`Plano_treino_id_Plano_treino`),
  CONSTRAINT `fk_Agendamento_Alunos1` FOREIGN KEY (`Alunos_id_Alunos`) REFERENCES `alunos` (`id_Alunos`),
  CONSTRAINT `fk_Agendamento_Plano_treino1` FOREIGN KEY (`Plano_treino_id_Plano_treino`) REFERENCES `plano_treino` (`id_Plano_treino`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id_Alunos` int NOT NULL auto_increment,
  `nome` varchar(45) DEFAULT NULL,
  `Idade` int DEFAULT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_Alunos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plano_treino`
--

DROP TABLE IF EXISTS `plano_treino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plano_treino` (
  `id_Plano_treino` int NOT NULL auto_increment,
  `tipo` varchar(45) DEFAULT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  `objetivo` varchar(45) DEFAULT NULL,
  `Alunos_id_Alunos` int NOT NULL,
  PRIMARY KEY (`id_Plano_treino`),
  KEY `fk_Plano_treino_Alunos_idx` (`Alunos_id_Alunos`),
  CONSTRAINT `fk_Plano_treino_Alunos` FOREIGN KEY (`Alunos_id_Alunos`) REFERENCES `alunos` (`id_Alunos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plano_treino`
--

LOCK TABLES `plano_treino` WRITE;
/*!40000 ALTER TABLE `plano_treino` DISABLE KEYS */;
/*!40000 ALTER TABLE `plano_treino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_Usuario` int NOT NULL auto_increment,
  `nome` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `senha` varchar(300) NOT NULL,
  PRIMARY KEY (`id_Usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-28 20:06:54
-- ---------- DADOS (3 registros por tabela) ----------
INSERT INTO usuario (nome, email, senha) VALUES
('Gerente Paula',   'paula@academia.com',  '123456'),
('Recepção Lucas',  'lucas@academia.com',  '123456'),
('Recepção Camila', 'camila@academia.com', '123456');
 
INSERT INTO alunos (nome, Idade, cpf, telefone, email) VALUES
('Rafael Mendes', 24, '11144477735', '47999990001', 'rafael@email.com'),
('Beatriz Lima',  31, '52998224725', '47999990002', 'beatriz@email.com'),
('Thiago Rocha',  19, '39053344705', '47999990003', 'thiago@email.com');
 
INSERT INTO plano_treino (tipo, descricao, objetivo, Alunos_id_Alunos) VALUES
('Hipertrofia',     'Treino ABC com foco em força',  'Ganho de massa',       1),
('Emagrecimento',   'Circuito funcional e aeróbico', 'Perda de gordura',     2),
('Condicionamento', 'Treino geral 3x por semana',    'Melhorar resistência', 3);
 
INSERT INTO agendamento (data_aula, personal, Alunos_id_Alunos, Plano_treino_id_Plano_treino) VALUES
('2026-11-02', 'Marcos',  1, 1),
('2026-11-03', 'Juliana', 2, 2),
('2026-11-05', 'Marcos',  3, 3);

set SQL_SAFE_UPDATES = 0;

update usuario set senha = "$2b$10$B9UooWF.zv3G6C3uxyJabesYv6U78oVQQmlfmqGHf8dd0g3bQNWFi";

update alunos set cpf = '$2b$10$twDBE5ELou9.2xCKdREsiem/fphi9EEGVDRtDnUALhxHJZORsGxem' where id_Alunos = 1;
update alunos set cpf = '$2b$10$d6TmjUd7E4nGskQnYSNfkOHSV6STN3j0.dVwNiqr1ItztC5YpAfzq' where id_Alunos = 2;
update alunos set cpf = '$2b$10$l3KCBV0mkRJoTaNkqz40pew/ouv2LdfMWNL/b7WyJF5rHWU6b8WYy' where id_Alunos = 3;

select * from alunos;

select * from usuario;