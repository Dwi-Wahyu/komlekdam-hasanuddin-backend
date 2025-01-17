/*
  Warnings:

  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `team`;

-- CreateTable
CREATE TABLE `struktur` (
    `id` VARCHAR(191) NOT NULL,
    `urutan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `gambar` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `struktur_urutan_key`(`urutan`),
    UNIQUE INDEX `struktur_nama_key`(`nama`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
