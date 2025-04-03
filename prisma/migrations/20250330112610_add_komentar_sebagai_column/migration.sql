/*
  Warnings:

  - Added the required column `komentar_sebagai` to the `balasan_komentar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `komentar_sebagai` to the `komentar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `balasan_komentar` ADD COLUMN `komentar_sebagai` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `komentar` ADD COLUMN `komentar_sebagai` VARCHAR(191) NOT NULL;
