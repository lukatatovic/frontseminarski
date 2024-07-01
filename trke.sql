/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - trke
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`trke` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `trke`;

/*Table structure for table `automobil` */

DROP TABLE IF EXISTS `automobil`;

CREATE TABLE `automobil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marka` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `broj_ks` int(11) DEFAULT NULL,
  `zapremina_motora` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `automobil` */

insert  into `automobil`(`id`,`marka`,`model`,`broj_ks`,`zapremina_motora`) values 
(1,'Fiat','Evo',88,1.4),
(2,'Yugo','55',46,1.1),
(3,'Ferrari','SF-24',1070,1.6),
(4,'Ferrari','SF-23',1050,1.6);

/*Table structure for table `grad` */

DROP TABLE IF EXISTS `grad`;

CREATE TABLE `grad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) DEFAULT NULL,
  `duzina_kruga` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `grad` */

insert  into `grad`(`id`,`naziv`,`duzina_kruga`) values 
(1,'Monca',4529.2),
(2,'Baku',6003);

/*Table structure for table `korisnik` */

DROP TABLE IF EXISTS `korisnik`;

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) DEFAULT NULL,
  `prezime` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `korisnik` */

insert  into `korisnik`(`id`,`ime`,`prezime`,`username`,`password`) values 
(1,'Luka','Tatovic','luka','luka'),
(2,'Pera','Peric','pera','pera');

/*Table structure for table `takmicar` */

DROP TABLE IF EXISTS `takmicar`;

CREATE TABLE `takmicar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trka_id` int(11) NOT NULL,
  `start` int(11) DEFAULT NULL,
  `kraj` int(11) DEFAULT NULL,
  `broj_automobila` int(11) DEFAULT NULL,
  `vreme` time DEFAULT NULL,
  `vozac_id` int(11) DEFAULT NULL,
  `automobil_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `takmicar_fk_trka` (`trka_id`),
  KEY `takmicar_fk_vozac` (`vozac_id`),
  KEY `takmicar_fk_auto` (`automobil_id`),
  CONSTRAINT `takmicar_fk_auto` FOREIGN KEY (`automobil_id`) REFERENCES `automobil` (`id`),
  CONSTRAINT `takmicar_fk_trka` FOREIGN KEY (`trka_id`) REFERENCES `trka` (`id`),
  CONSTRAINT `takmicar_fk_vozac` FOREIGN KEY (`vozac_id`) REFERENCES `vozac` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `takmicar` */

insert  into `takmicar`(`id`,`trka_id`,`start`,`kraj`,`broj_automobila`,`vreme`,`vozac_id`,`automobil_id`) values 
(1,2,1,1,2,'12:23:23',2,1),
(2,2,2,2,43,'12:42:05',6,2),
(7,10,1,1,4,'00:54:02',1,1),
(8,10,2,2,51,'00:55:53',7,2),
(9,10,3,3,43,'00:56:07',6,2);

/*Table structure for table `trka` */

DROP TABLE IF EXISTS `trka`;

CREATE TABLE `trka` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duzina` double DEFAULT NULL,
  `broj_krugova` int(11) DEFAULT NULL,
  `broj_takmicara` int(11) DEFAULT NULL,
  `vreme` time DEFAULT NULL,
  `trka_suvo` tinyint(1) DEFAULT NULL,
  `grad_id` int(11) DEFAULT NULL,
  `korisnik_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trka_fk_grad` (`grad_id`),
  KEY `trka_fk_korisni` (`korisnik_id`),
  CONSTRAINT `trka_fk_grad` FOREIGN KEY (`grad_id`) REFERENCES `grad` (`id`),
  CONSTRAINT `trka_fk_korisni` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `trka` */

insert  into `trka`(`id`,`duzina`,`broj_krugova`,`broj_takmicara`,`vreme`,`trka_suvo`,`grad_id`,`korisnik_id`) values 
(2,6003,1,2,'12:23:23',1,2,1),
(10,13587.599999999999,3,3,'00:54:02',1,1,1);

/*Table structure for table `vozac` */

DROP TABLE IF EXISTS `vozac`;

CREATE TABLE `vozac` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) DEFAULT NULL,
  `prezime` varchar(255) DEFAULT NULL,
  `datum_rodjenja` date DEFAULT NULL,
  `drzava` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `vozac` */

insert  into `vozac`(`id`,`ime`,`prezime`,`datum_rodjenja`,`drzava`) values 
(1,'Luka','Tatovic','2000-01-04','Srbija'),
(2,'Uros','Tatovic','2005-07-05','Srbija'),
(6,'Mirko','Mirkovic','2024-06-02','Srbija'),
(7,'Pera','Peric','1998-07-26','Srbija'),
(8,'Charles','Leclerc','1997-10-16','Monako'),
(9,'Max','Verstappen','1997-09-30','Holandija'),
(10,'Lewis','Hamilton','1985-01-07','Velika Britanija');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
