-- CreateTable
CREATE TABLE `laporan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_lainnya` (
    `nomor` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `data_lainnya_label_key`(`label`),
    PRIMARY KEY (`nomor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'Journalis',

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `penulis` VARCHAR(191) NOT NULL,
    `lokasi` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `last_updated_by_username` VARCHAR(191) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `like` INTEGER NOT NULL DEFAULT 0,
    `dislike` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isi` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL DEFAULT 0,
    `dislike` INTEGER NOT NULL DEFAULT 0,
    `id_berita` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balasan_komentar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isi` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `kepada` VARCHAR(191) NOT NULL,
    `like` INTEGER NOT NULL DEFAULT 0,
    `dislike` INTEGER NOT NULL DEFAULT 0,
    `id_komentar` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program` (
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
CREATE TABLE `live_youtube` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cerita_inspiratif` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,
    `videoPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal_lagu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `laguPath` VARCHAR(191) NOT NULL,
    `durasi` VARCHAR(191) NOT NULL,
    `mulai` VARCHAR(191) NOT NULL,
    `selesai` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_program` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `id_program` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pimpinan` (
    `jabatan` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `pasfoto` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `pimpinan_nama_key`(`nama`),
    PRIMARY KEY (`jabatan`)
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
CREATE TABLE `litbang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tanggal` VARCHAR(191) NOT NULL,
    `detail` TEXT NOT NULL,
    `thumbnailPath` VARCHAR(191) NOT NULL,
    `videoPath` VARCHAR(191) NOT NULL,
    `penulis` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_litbang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `id_litbang` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kakomlekdam_lampau` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fotoPath` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `logoPath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumentasi_mitra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_keterangan` VARCHAR(191) NOT NULL,
    `narasi_keterangan` VARCHAR(191) NOT NULL,
    `dokumentasiPath` VARCHAR(191) NOT NULL,
    `id_mitra` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_last_updated_by_username_fkey` FOREIGN KEY (`last_updated_by_username`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_id_berita_fkey` FOREIGN KEY (`id_berita`) REFERENCES `berita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balasan_komentar` ADD CONSTRAINT `balasan_komentar_id_komentar_fkey` FOREIGN KEY (`id_komentar`) REFERENCES `komentar`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumentasi_program` ADD CONSTRAINT `dokumentasi_program_id_program_fkey` FOREIGN KEY (`id_program`) REFERENCES `program`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumentasi_litbang` ADD CONSTRAINT `dokumentasi_litbang_id_litbang_fkey` FOREIGN KEY (`id_litbang`) REFERENCES `litbang`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumentasi_mitra` ADD CONSTRAINT `dokumentasi_mitra_id_mitra_fkey` FOREIGN KEY (`id_mitra`) REFERENCES `mitra`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
