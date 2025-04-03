import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import { validateDokumentasi } from 'src/common/validation/dokumentasi.validation';
import { validateThumbnail } from 'src/common/validation/thumbnail.validation';
import { validateVideo } from 'src/common/validation/video.validation';

@Injectable()
export class LitbangValidationPipe implements PipeTransform {
  transform(files: {
    video: Express.Multer.File[];
    thumbnail: Express.Multer.File[];
    dokumentasi: Express.Multer.File[];
  }) {
    const { thumbnail, video, dokumentasi } = files;

    validateThumbnail(thumbnail);

    validateVideo(video);

    validateDokumentasi(dokumentasi);

    return files;
  }
}
