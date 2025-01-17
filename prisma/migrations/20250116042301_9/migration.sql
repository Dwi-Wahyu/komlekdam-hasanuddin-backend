/*
  Warnings:

  - A unique constraint covering the columns `[kategori]` on the table `data_statistik` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_statistik]` on the table `statistik` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `data_statistik_kategori_key` ON `data_statistik`(`kategori`);

-- CreateIndex
CREATE UNIQUE INDEX `statistik_nama_statistik_key` ON `statistik`(`nama_statistik`);
