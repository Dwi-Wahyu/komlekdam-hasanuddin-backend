/*
  Warnings:

  - Added the required column `nomor` to the `laporan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporan` ADD COLUMN `nomor` VARCHAR(191) NOT NULL;
