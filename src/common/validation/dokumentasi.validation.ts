import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export function validateDokumentasi(dokumentasi: Express.Multer.File[]) {
  if (!dokumentasi || dokumentasi.length === 0) {
    throw new BadRequestException('Tolong sertakan dokumentasi');
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
  const maxSize = 1024 * 1024 * 1024; // 1GB

  for (const file of dokumentasi) {
    const fileExtension = extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Format file ${file.originalname} tidak sesuai`,
      );
    }

    if (file.size > maxSize) {
      throw new BadRequestException(
        `Ukuran file ${file.originalname} melebihi 100MB`,
      );
    }
  }
}
