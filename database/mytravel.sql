-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 11:22 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mytravel`
--
CREATE DATABASE IF NOT EXISTS `mytravel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mytravel`;

-- --------------------------------------------------------

--
-- Table structure for table `continents`
--

CREATE TABLE `continents` (
  `continentID` int(11) NOT NULL,
  `continentName` varchar(20) NOT NULL,
  `continentImageName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `continents`
--

INSERT INTO `continents` (`continentID`, `continentName`, `continentImageName`) VALUES
(1, 'Asia', 'Asia.jpg'),
(2, 'Europe', 'Europe.jpg'),
(3, 'Africa', 'Africa.jpg'),
(4, 'Australia', 'Australia.jpg'),
(5, 'Antarctica', 'Antarctica.jpg'),
(6, 'North-America', 'North-America.jpg'),
(7, 'South-America', 'South-America.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationID`) VALUES
(1, 15),
(1, 17),
(3, 9),
(3, 15),
(3, 12),
(3, 1),
(3, 11),
(4, 4),
(4, 2),
(4, 17),
(4, 7),
(5, 4),
(5, 15),
(5, 13),
(5, 17),
(5, 5),
(5, 16);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'USER',
  `imageName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username`, `password`, `email`, `role`, `imageName`) VALUES
(1, 'Michal', 'Shenkar', 'michal - user', 'c64dc6164575e7578f014ed536fa33e85d664025ca5641e42c660e19c14632cd0ed5c8cb2da31ae0b2d12ca0cce15291c2f1a82fa4b1619bb1f163fb20c397f5', '0583294585m@gmail.com', 'User', 'd302351f-ebbf-4580-a74d-56cfbd59642b.jpg'),
(2, 'Shenkar', 'Michal', 'michal - admin', '3e350231e37458bf670a45fe9362c4dfb7476f11ec9b92e6b3c25e2278cd0bc73dd3c6bb18df88de9f6cbd011723ca9b21d8a0a1520c236dcbdc57b2ccc26a30', 'admin@gmail.com', 'Admin', NULL),
(3, 'User', 'user', 'user2', 'ab4d4a51444d6c66d5b5b845b14a3d2b1f141111146c8416b0e8da81063e2410896f634fffc52cee85d62100faee9a4bb435dff7331e9e02deb4114656d99821', 'user@gmail.com', 'User', NULL),
(4, 'user3', 'user3', 'user-user', 'c3abde218e3f276620a7c8961c38832533c018586f56fd00747a0d77bc5cc2be0d509c58d569ee07930f9501e0643d92ee9d66120999ee257967560885d060a4', 'user3@gmail.com', 'User', NULL),
(5, 'user4', 'user4', 'user4', 'b30f13c2b365fd0847f96773927f42b31f24e474cafeb20120b04868abf64f3e022d8b2137c528d0841321d023c1b4d028348fe5ae48675b2b952ac7954c001b', 'user4@gmail.com', 'User', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(35) NOT NULL,
  `continentID` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `continentID`, `description`, `startDate`, `endDate`, `duration`, `price`, `imageName`) VALUES
(1, 'Great Barrier Reef', 4, 'Vast coral reef and marine biodiversity located in the Pacific Ocean.', '2023-06-28', '2023-07-28', NULL, 9699, '36bb59e0-b636-4e67-9faf-f81341b92bb7.jpg'),
(2, 'Egypt - Giza Pyramids', 3, 'One of the New Seven Wonders of the World, an ancient monument located in central Egypt.', '2023-07-01', '2023-07-17', NULL, 7600, 'c6d027b5-8d27-4700-8085-002cc3e9f55c.jpg'),
(3, 'China - Great Wall of China', 1, 'A historic structure stretching over approximately 21,196 kilometers along the northern border of China.', '2023-06-27', '2023-07-24', NULL, 8000, 'ef13c6c8-ec64-47e3-9f9b-5f0ef43e2630.jpg'),
(4, 'France - Versailles Gardens', 2, 'A park with stunning attractions, located in Paris.', '2023-06-28', '2023-06-30', NULL, 2500, 'd77d0f7b-ac96-48b1-ad1d-8c3668a1488f.jpg'),
(5, 'Italy - Florence', 2, 'The art city in the famous region of Tuscany, known for its rich collection of ancient and unique art.', '2023-07-20', '2023-07-25', NULL, 5000, '44a1a3c1-6c41-47e5-9d7c-2b56b3816f19.jpg'),
(6, 'Tanzania - Serengeti National Park', 3, 'One of the most famous nature reserves in East Africa, home to the annual wildebeest migration.', '2023-08-01', '2023-08-14', NULL, 7450, '0ba267ba-8292-4b64-a517-d90d7110a516.jpg'),
(7, 'Argentina - Patagonia', 7, 'A region in Argentina that includes breathtaking landscapes such as the Andes Mountains, lakes, and glaciers.', '2023-07-20', '2023-08-13', NULL, 8400, '07624af1-41e6-4390-a400-d2431ed1985a.jpg'),
(8, 'Greece - Acropolis', 2, 'A high fortified structure in the center of Athens considered the cultural centerpiece of ancient Greece.', '2023-07-10', '2023-07-14', NULL, 5200, 'b29d9e8e-db6d-459f-894f-381c5ade3b2b.jpg'),
(9, 'Japan - Mount Fuji', 1, 'Japan\'s most iconic active volcano and a national symbol.', '2023-06-23', '2023-07-13', NULL, 9500, 'acfafe3f-ffab-4ff4-907a-db75ada000dc.jpg'),
(10, 'Yosemite National Park', 6, 'A stunning national park in the Sierra Nevada Mountains of California, USA.', '2023-07-23', '2023-08-02', NULL, 9800, '3397fdcb-3155-46d1-be0e-bba742ea1055.jpg'),
(11, 'New Zealand', 4, 'Tongariro National Park: An island in New Zealand known for its stunning landscapes, including Mount Tongariro and the Northern Circuit.', '2023-08-30', '2023-09-15', NULL, 8700, '05b39f45-e096-40a1-9cdc-c00f8704be30.jpg'),
(12, 'Grand Canyon', 6, 'A deep canyon located at the border of the United States and Mexico.', '2023-06-27', '2023-07-11', NULL, 7300, 'cd7d0c27-bd33-49ae-ae91-5ade461e32bf.png'),
(13, 'Ireland - Giant\'s Causeway', 2, 'A legendary archaeological site featuring hundreds of massive stone columns located in Northern Ireland.', '2023-07-04', '2023-07-14', NULL, 5600, '912f2d78-412c-4cb9-b645-78bcb3e618d7.jpg'),
(14, 'Morocco - Volubilis', 3, 'An impressive archaeological site located in the city of Meknes.', '2023-06-28', '2023-07-18', NULL, 2800, 'aa49c897-23dc-4a31-ac28-a7310cf6632c.jpg'),
(15, 'Iceland - Gullfoss Waterfall', 2, 'A natural site that includes magnificent and powerful waterfalls in Iceland.', '2023-06-30', '2023-07-14', NULL, 3670, 'a5bb0c2e-cb1f-4a20-acee-04cab70bbc26.jpg'),
(16, 'Mount Mitchell', 5, 'בטח! הנה תרגום לאנגלית של שם המקום והתיאור:\r\nMount Mitchell is the highest peak in Antarctica, serving as a breathtaking viewpoint of the endless ice fields and panoramic landscapes of the surrounding area. ', '2023-07-27', '2023-08-10', NULL, 8750, 'c5bb12b4-d4df-4065-9955-046156a0853e.jpg'),
(17, 'Petra, Jordan', 1, 'Petra is a breathtaking archaeological treasure, emerging from glistening rocks and providing you with an experience of awe and wonder.', '2023-07-06', '2023-07-26', NULL, 1500, 'f4e15744-2091-4b0d-a445-b1bd1e758c8a.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `continents`
--
ALTER TABLE `continents`
  ADD PRIMARY KEY (`continentID`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`),
  ADD KEY `continentID` (`continentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `continents`
--
ALTER TABLE `continents`
  MODIFY `continentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE;

--
-- Constraints for table `vacations`
--
ALTER TABLE `vacations`
  ADD CONSTRAINT `vacations_ibfk_1` FOREIGN KEY (`continentID`) REFERENCES `continents` (`continentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
