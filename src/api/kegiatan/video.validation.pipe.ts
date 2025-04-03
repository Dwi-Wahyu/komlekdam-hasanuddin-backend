import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class VideoValidationPipe implements PipeTransform {
  transform(video: Express.Multer.File) {
    if (!video) {
      throw new BadRequestException('Tolong sertakan video');
    }

    if (video.size > 10 * 1024 * 1024 * 1024) {
      throw new BadRequestException('Ukuran video melebihi 10GB');
    }

    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
    const fileExtension = extname(video.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Format video tidak sesuai');
    }

    return video;
  }
}
