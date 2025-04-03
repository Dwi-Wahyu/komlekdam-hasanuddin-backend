import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class DokumentasiValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Tolong sertakan dokumentasi');
    }

    if (file.size > 1024 * 1024 * 1024) {
      throw new BadRequestException('Ukuran dokumentasi melebihi 1GB');
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Format dokumentasi tidak sesuai');
    }

    return file;
  }
}
