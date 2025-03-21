/*
  Warnings:

  - You are about to drop the column `nomor` on the `laporan` table. All the data in the column will be lost.
  - You are about to drop the `berita` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `laporan` DROP COLUMN `nomor`;

-- DropTable
DROP TABLE `berita`;

-- CreateTable
CREATE TABLE `data_lainnya` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `data_lainnya_label_key`(`label`),
    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengguna` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pengguna_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_program` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `id_program` VARCHAR(191) NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dokumentasi_program` ADD CONSTRAINT `dokumentasi_program_id_program_fkey` FOREIGN KEY (`id_program`) REFERENCES `program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
