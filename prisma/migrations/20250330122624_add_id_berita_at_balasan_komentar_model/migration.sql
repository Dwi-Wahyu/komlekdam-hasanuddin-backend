-- AlterTable
ALTER TABLE `balasan_komentar` ADD COLUMN `id_berita` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `balasan_komentar` ADD CONSTRAINT `balasan_komentar_id_berita_fkey` FOREIGN KEY (`id_berita`) REFERENCES `berita`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
