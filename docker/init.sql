CREATE DATABASE  IF NOT EXISTS `dblegajo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dblegajo`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: dblegajo
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `articulo`
--

-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `idciudad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `estado` varchar(2) NOT NULL,
  PRIMARY KEY (`idciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idpersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `documento` varchar(45) NOT NULL,
  `nacimiento` varchar(60) NOT NULL,
  `sexo` varchar(2) NOT NULL,
  `est_civil` varchar(2) DEFAULT NULL,
  `photo` LONGBLOB DEFAULT NULL,
  `direccion` varchar(200) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `tipo_doc` varchar(2) NOT NULL,
  `nacionalidad` varchar(2) DEFAULT NULL,
  `idciudad` int NOT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) NOT NULL,
  `fecha_insert` date DEFAULT NULL,
  `fecha_upd` date DEFAULT NULL,
  `idusuario_upd` varchar(100) DEFAULT NULL,
  `fecha_agendamiento` date DEFAULT NULL,
  cod_asesor INT,
  FOREIGN KEY (cod_asesor) REFERENCES asesor(cod_asesor),
  PRIMARY KEY (`idpersona`),
  UNIQUE KEY `documento_UNIQUE` (`documento`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `legajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE legajo (
    idlegajo BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    detalle TEXT,
    idusuario varchar(100) ,
    fecha_insert TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_upd DATETIME,
    estado VARCHAR(2),
    idpersona int,
    img LONGBLOB DEFAULT NULL,
    FOREIGN KEY (idpersona) REFERENCES persona(idpersona)
);
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE TABLE asesor (
    cod_asesor INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT,
    apellido TEXT,
    estado TEXT,
    idusuario varchar(100)
);