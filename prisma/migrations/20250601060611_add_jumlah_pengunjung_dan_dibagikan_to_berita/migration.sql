-- AlterTable
ALTER TABLE `berita` ADD COLUMN `jumlahDibagikan` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `jumlahPengunjung` INTEGER NOT NULL DEFAULT 0;
