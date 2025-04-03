import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export function validateThumbnail(thumbnail: Express.Multer.File[]) {
  if (!thumbnail) {
    throw new BadRequestException('Tolong sertakan thumbnail');
  }

  if (thumbnail[0].size > 1024 * 1024 * 1024) {
    throw new BadRequestException('Ukuran thumbnail melebihi 1GB');
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = extname(thumbnail[0].originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new BadRequestException('Format thumbnail tidak sesuai');
  }
}
