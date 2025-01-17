/*
  Warnings:

  - You are about to drop the column `kategori` on the `statistik` table. All the data in the column will be lost.
  - You are about to drop the column `persentase` on the `statistik` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `statistik_nama_statistik_key` ON `statistik`;

-- AlterTable
ALTER TABLE `statistik` DROP COLUMN `kategori`,
    DROP COLUMN `persentase`;

-- CreateTable
CREATE TABLE `data_statistik` (
    `id` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `persentase` VARCHAR(191) NOT NULL,
    `statistikId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `data_statistik` ADD CONSTRAINT `data_statistik_statistikId_fkey` FOREIGN KEY (`statistikId`) REFERENCES `statistik`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
