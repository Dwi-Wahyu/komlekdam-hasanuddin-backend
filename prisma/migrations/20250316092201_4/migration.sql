/*
  Warnings:

  - Added the required column `lastUpdatedById` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `berita` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `berita` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastUpdatedById` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_lastUpdatedById_fkey` FOREIGN KEY (`lastUpdatedById`) REFERENCES `pengguna`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
