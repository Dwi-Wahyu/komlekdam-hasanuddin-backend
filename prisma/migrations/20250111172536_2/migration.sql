-- AlterTable
ALTER TABLE `artikel` ADD COLUMN `id_pengguna` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `pengguna` (
    `id` VARCHAR(191) NOT NULL,
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pengguna_nomor_key`(`nomor`),
    UNIQUE INDEX `pengguna_username_key`(`username`),
    UNIQUE INDEX `pengguna_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_id_pengguna_fkey` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
