-- CreateTable
CREATE TABLE `kata_sambutan` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_acara` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `mulai` VARCHAR(191) NOT NULL,
    `selesai` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `program_acara_judul_key`(`judul`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistik` (
    `id` VARCHAR(191) NOT NULL,
    `nama_statistik` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `persentase` INTEGER NOT NULL,

    UNIQUE INDEX `statistik_nama_statistik_key`(`nama_statistik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
