-- ZRprivateServer SQL Database
-- Version 1.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `globals`
--

CREATE TABLE IF NOT EXISTS `globals` (
  `id` INT UNSIGNED NOT NULL,
  `key` VARCHAR(255) NOT NULL,
  `value` TEXT NULL DEFAULT NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `friend_code` VARCHAR(255) NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NOT NULL DEFAULT '/asset/image/avatar.png',
  `coins` INT UNSIGNED NOT NULL DEFAULT '0',
  `gems` INT UNSIGNED NOT NULL DEFAULT '0',
  `level` INT UNSIGNED NOT NULL DEFAULT '1',
  `experience` INT NOT NULL DEFAULT '0',
  `status` VARCHAR(45) NOT NULL DEFAULT 'offline',
  `is_admin` TINYINT(1) NOT NULL DEFAULT '0',
  `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Table structture for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `key` VARCHAR(255) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `expires` DATETIME NOT NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

--
-- Indexes for table `globals`
--

ALTER TABLE `globals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE INDEX `key` (`key` ASC) VISIBLE;

--
-- Indexes for table `users`
--

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  ADD UNIQUE INDEX `friend_code_UNIQUE` (`friend_code` ASC) VISIBLE;

--
-- Indexes for table `sessions`
--

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`key`),
  ADD INDEX `user_id` (`user_id` ASC) VISIBLE;

--
-- Auto-increment for table `globals`
--

ALTER TABLE `globals`
  MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Auto-increment for table `users`
--

ALTER TABLE `users`
  MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;

COMMIT;