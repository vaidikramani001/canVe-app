/*
  Warnings:

  - You are about to alter the column `userId` on the `document` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `document` DROP FOREIGN KEY `document_userId_fkey`;

-- AlterTable
ALTER TABLE `document` MODIFY `userId` INTEGER NULL;
