-- CreateTable
CREATE TABLE `pengunjung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATE NOT NULL,
    `jumlah` INTEGER NOT NULL DEFAULT 0,
    `dibuatPada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `diperbaruiPada` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pengunjung_tanggal_key`(`tanggal`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
