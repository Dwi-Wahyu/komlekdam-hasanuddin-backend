/*
  Warnings:

  - You are about to drop the `dokumentasi_program` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `program` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `dokumentasi_program` DROP FOREIGN KEY `dokumentasi_program_id_program_fkey`;

-- DropTable
DROP TABLE `dokumentasi_program`;

-- DropTable
DROP TABLE `program`;

-- CreateTable
CREATE TABLE `kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,
    `videoPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `id_kegiatan` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dokumentasi_kegiatan` ADD CONSTRAINT `dokumentasi_kegiatan_id_kegiatan_fkey` FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
