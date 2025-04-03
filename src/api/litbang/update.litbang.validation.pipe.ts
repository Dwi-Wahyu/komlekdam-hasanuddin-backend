import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { log } from 'console';
import { extname } from 'path';

function validateThumbnail(thumbnail: Express.Multer.File[]) {
  if (!thumbnail) {
    throw new BadRequestException('Tolong sertakan thumbnail');
  }

  if (thumbnail[0].size > 100 * 1024 * 1024) {
    throw new BadRequestException('Ukuran thumbnail melebihi 100MB');
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = extname(thumbnail[0].originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new BadRequestException('Format thumbnail tidak sesuai');
  }
}

function validateVideo(video: Express.Multer.File[]) {
  if (!video) {
    throw new BadRequestException('Tolong sertakan video');
  }

  if (video[0].size > 1024 * 1024 * 1024) {
    throw new BadRequestException('Ukuran video melebihi 1GB');
  }

  const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
  const fileExtension = extname(video[0].originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new BadRequestException('Format video tidak sesuai');
  }
}

@Injectable()
export class UpdateLitbangValidationPipe implements PipeTransform {
  transform(files: {
    video: Express.Multer.File[];
    thumbnail: Express.Multer.File[];
    dokumentasi: Express.Multer.File[];
  }) {
    const { thumbnail, video, dokumentasi } = files;

    validateThumbnail(thumbnail);

    validateVideo(video);

    return files;
  }
}
