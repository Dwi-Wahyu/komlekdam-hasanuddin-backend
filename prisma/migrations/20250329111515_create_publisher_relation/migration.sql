-- AlterTable
ALTER TABLE `berita` ADD COLUMN `dipublish_oleh_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_dipublish_oleh_id_fkey` FOREIGN KEY (`dipublish_oleh_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
