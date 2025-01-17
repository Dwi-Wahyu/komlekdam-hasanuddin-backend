/*
  Warnings:

  - You are about to drop the column `statistikId` on the `data_statistik` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `data_statistik` DROP FOREIGN KEY `data_statistik_statistikId_fkey`;

-- DropIndex
DROP INDEX `data_statistik_statistikId_fkey` ON `data_statistik`;

-- AlterTable
ALTER TABLE `data_statistik` DROP COLUMN `statistikId`,
    ADD COLUMN `id_statistik` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `data_statistik` ADD CONSTRAINT `data_statistik_id_statistik_fkey` FOREIGN KEY (`id_statistik`) REFERENCES `statistik`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
