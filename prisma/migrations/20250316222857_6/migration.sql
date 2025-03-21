-- CreateTable
CREATE TABLE `kakomlekdam` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `pasfoto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wakakomlekdam` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `pasfoto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pejabat_satuan` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `pasfoto` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kakomlekdam_lampau` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jabatan` VARCHAR(191) NOT NULL,
    `periode` VARCHAR(191) NOT NULL,
    `pasfoto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mitra` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `logoPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_mitra` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_keterangan` VARCHAR(191) NOT NULL,
    `narasi_keterangan` VARCHAR(191) NOT NULL,
    `mitraNomor` INTEGER NULL,

    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dokumentasi_mitra` ADD CONSTRAINT `dokumentasi_mitra_mitraNomor_fkey` FOREIGN KEY (`mitraNomor`) REFERENCES `mitra`(`nomor`) ON DELETE SET NULL ON UPDATE CASCADE;
