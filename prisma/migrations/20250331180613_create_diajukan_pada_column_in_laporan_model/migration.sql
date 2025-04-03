/*
  Warnings:

  - Added the required column `diajukan_pada` to the `laporan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporan` ADD COLUMN `diajukan_pada` VARCHAR(191) NOT NULL;
