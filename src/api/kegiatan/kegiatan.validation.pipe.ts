import { PipeTransform, Injectable } from '@nestjs/common';
import { validateDokumentasi } from 'src/common/validation/dokumentasi.validation';
import { validateThumbnail } from 'src/common/validation/thumbnail.validation';
import { validateVideo } from 'src/common/validation/video.validation';

@Injectable()
export class KegiatanValidationPipe implements PipeTransform {
  transform(files: {
    thumbnail: Express.Multer.File[];
    video: Express.Multer.File[];
    dokumentasi: Express.Multer.File[];
  }) {
    const { thumbnail, dokumentasi, video } = files;

    validateThumbnail(thumbnail);

    validateVideo(video);

    validateDokumentasi(dokumentasi);

    return files;
  }
}
