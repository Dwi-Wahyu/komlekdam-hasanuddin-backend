/*
  Warnings:

  - You are about to drop the column `dibuatPada` on the `pengunjung` table. All the data in the column will be lost.
  - You are about to drop the column `diperbaruiPada` on the `pengunjung` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tanggal]` on the table `pengunjung` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `pengunjung` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengunjung` DROP COLUMN `dibuatPada`,
    DROP COLUMN `diperbaruiPada`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `tanggal` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pengunjung_tanggal_key` ON `pengunjung`(`tanggal`);
