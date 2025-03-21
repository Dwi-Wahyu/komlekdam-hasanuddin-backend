/*
  Warnings:

  - You are about to drop the column `lastUpdatedById` on the `berita` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `berita` DROP FOREIGN KEY `berita_lastUpdatedById_fkey`;

-- DropIndex
DROP INDEX `berita_lastUpdatedById_fkey` ON `berita`;

-- AlterTable
ALTER TABLE `berita` DROP COLUMN `lastUpdatedById`,
    ADD COLUMN `last_updated_by_username` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_last_updated_by_username_fkey` FOREIGN KEY (`last_updated_by_username`) REFERENCES `pengguna`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;
