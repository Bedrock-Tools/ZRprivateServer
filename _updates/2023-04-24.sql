ALTER TABLE `users` ADD `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created`;

CREATE TABLE IF NOT EXISTS `friends` (
  `id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `friend_id` INT UNSIGNED NOT NULL
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `friendreqs` (
  `id` INT UNSIGNED NOT NULL,
  `sender_id` INT UNSIGNED NOT NULL,
  `receiver_id` INT UNSIGNED NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_general_ci;

ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE INDEX `unique_user_friend_index` (`user_id` ASC, `friend_id` ASC) VISIBLE;

ALTER TABLE `friendreqs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE INDEX `unique_sender_receiver_index` (`sender_id` ASC, `receiver_id` ASC) VISIBLE;

ALTER TABLE `friends`
  MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `friendreqs`
  MODIFY `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;