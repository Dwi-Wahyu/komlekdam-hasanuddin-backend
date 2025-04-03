import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class LaguValidationPipe implements PipeTransform {
  private readonly maxSize = 1024 * 1024 * 1024; // 1GB
  private readonly allowedMimeTypes = [
    'audio/mpeg', // MP3
    'audio/wav', // WAV
    'audio/ogg', // OGG
    'audio/x-wav', // WAV alternatif
    'audio/x-m4a', // M4A
    'audio/aac', // AAC
  ];
  private readonly allowedExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];

  transform(lagu: Express.Multer.File) {
    if (!lagu) {
      throw new BadRequestException('Tolong sertakan file lagu');
    }

    if (lagu.size > this.maxSize) {
      throw new BadRequestException(
        `Ukuran file maksimal ${this.maxSize / 1024 / 1024}MB`,
      );
    }

    const fileExtension = extname(lagu.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Format file tidak didukung. Gunakan salah satu dari: ${this.allowedExtensions.join(', ')}`,
      );
    }

    if (!this.allowedMimeTypes.includes(lagu.mimetype)) {
      throw new BadRequestException(
        `Tipe file audio tidak valid. Gunakan salah satu dari: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    return lagu;
  }
}
