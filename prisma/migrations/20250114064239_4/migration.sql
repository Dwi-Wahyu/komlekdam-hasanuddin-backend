/*
  Warnings:

  - Added the required column `deskripsi` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `galeri` ADD COLUMN `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `team` ADD COLUMN `deskripsi` VARCHAR(191) NOT NULL;
