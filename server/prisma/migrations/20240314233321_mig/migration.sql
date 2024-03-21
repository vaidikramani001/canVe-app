-- CreateTable
CREATE TABLE `document` (
    `doc_type` TEXT NULL,
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `doc_number` TEXT NULL,
    `doc_status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `userId` INTEGER UNSIGNED NULL,

    INDEX `document_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(100) NULL,
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `password` TEXT NULL,
    `phone_number` INTEGER NULL,
    `roles` TEXT NOT NULL,
    `username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `email_unique`(`email`),
    UNIQUE INDEX `user_username_unique`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `document` ADD CONSTRAINT `document_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
