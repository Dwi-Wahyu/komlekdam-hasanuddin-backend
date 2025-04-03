import { Injectable, PipeTransform } from '@nestjs/common';
import { validateThumbnail } from 'src/common/validation/thumbnail.validation';
import { validateVideo } from 'src/common/validation/video.validation';

@Injectable()
export class CeritaInspiratifValidationPipe implements PipeTransform {
  transform(files: {
    video: Express.Multer.File[];
    thumbnail: Express.Multer.File[];
  }) {
    const { thumbnail, video } = files;

    validateThumbnail(thumbnail);

    validateVideo(video);

    return files;
  }
}
