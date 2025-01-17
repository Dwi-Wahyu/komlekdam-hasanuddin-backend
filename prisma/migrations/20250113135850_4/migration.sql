/*
  Warnings:

  - Added the required column `startTime` to the `program_acara` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `program_acara` ADD COLUMN `startTime` DATETIME(3) NOT NULL;
