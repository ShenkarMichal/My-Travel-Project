-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2023 at 09:20 PM
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
(11, 16),
(11, 2),
(11, 15),
(11, 3);

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
(1, 'Michal', 'Shenkar', 'msh', 'bb09182988271236b50bb0beb8fb68d17688534982d42018c07c3573b4cf39c23ced608cb7147786c9701081c0c76cfb88619033f412f539b869d0591e5396fc', '9876544@gmail.com', 'Admin', ''),
(2, 'Itay', 'Shenkar', 'itaySh', '7e70787a47526eb13a5fcd7826cb1a52c23a2ca8239e2766c993c83e79632e77387a382c853ea52e2666760d6c3fb919f5bda41c3e029f5dd44b8e446fae7796', '05041408@gmail.com', 'User', ''),
(3, 'Sara', 'Katzburg', 'skt', 'f6adc06974980fe23c351804d33bc67095af972a42bab37d8af44f35a78626684db81bed2078eaa9cd1ad1259dbc876bff09946ec46d1a8d98abf07afdc5f569', '4585@gmail.com', 'User', ''),
(4, 'Michal', 'Shenkar', 'michal', 'b9c1193de29d600fcc4d77d6f755a6019742c5e7f2e1445b53b1f5f2bf5d87d0cde815030ca45a9d52eec8f7c31d0885b6fd21f0fb0fc3a1a7a0003acd75ab66', 'michal.sh.arch@gmail.com', 'User', ''),
(5, 'Avigail', 'Shwnkar', 'Avig', '45cdc8ca7bd1486b83100ad5a7c563bbc4e7be2abbdbefd654c0fed8d2f2ff9dad08747c29454ea2a84c5feef70b19c4a8e92bde08cac8ebaa5cccf7152d1154', '0583294585m@gmail.com', 'User', ''),
(6, 'Mich', 'Shen', 'MichalAdmin', '45cdc8ca7bd1486b83100ad5a7c563bbc4e7be2abbdbefd654c0fed8d2f2ff9dad08747c29454ea2a84c5feef70b19c4a8e92bde08cac8ebaa5cccf7152d1154', 's0504140802@gmail.com', 'Admin', '8eaeccd0-98b8-49c3-877a-e488c30d5cb9.JPG'),
(7, 'Shlomo', 'Cohen', 'shlomo', '9933c8c76aeb38e856ef68d4d70136ea0bd00668668544f45c587a092791104207035e884ad3680d4bcb54a7e017850ea5f8d04520ff27f83099e50f97c4e305', 'shlomo@gmail.com', 'User', ''),
(9, 'Eti', 'Shenkar', 'etika', '1c550c80557a677c27347e4d40013a67eb11addf625c8c2ca0e9dd6f1d95746810774c18798d0f9c4b554ce7bf8996c807883ef84d05a411eebda3c809f6a146', '34rt5643@gmail.com', 'User', ''),
(10, 'Itay', 'shenkar', 'user', '1c550c80557a677c27347e4d40013a67eb11addf625c8c2ca0e9dd6f1d95746810774c18798d0f9c4b554ce7bf8996c807883ef84d05a411eebda3c809f6a146', '9786ytghdb@gmail.com', 'User', ''),
(11, 'mosh', 'ben ', 'michalUser', '45cdc8ca7bd1486b83100ad5a7c563bbc4e7be2abbdbefd654c0fed8d2f2ff9dad08747c29454ea2a84c5feef70b19c4a8e92bde08cac8ebaa5cccf7152d1154', 'user@gmail.com', 'User', '63893fc6-727e-4dee-b4da-ace92faa8fa4.JPG'),
(12, 'Itay', 'Shenkar', 'bfgsddg', 'fcd8151699e5d9132a038722f5e3cc0d58e560f5a312f1c079602650d2a6df22787d83b5aed35978c10832caf28055e9afe42be2527b5b76bc25dbbe9cb387d0', 'gjyggfg@gmail.com', 'User', NULL);

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
