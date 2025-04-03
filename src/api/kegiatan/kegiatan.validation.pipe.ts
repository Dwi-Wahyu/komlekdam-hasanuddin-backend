import { PipeTransform, Injectable } from '@nestjs/common';
import { validateDokumentasi } from 'src/common/validation/dokumentasi.validation';
import { validateThumbnail } from 'src/common/validation/thumbnail.validation';

@Injectable()
export class KegiatanValidationPipe implements PipeTransform {
  transform(files: {
    thumbnail: Express.Multer.File[];
    dokumentasi: Express.Multer.File[];
  }) {
    const { thumbnail, dokumentasi } = files;

    validateThumbnail(thumbnail);

    validateDokumentasi(dokumentasi);

    return files;
  }
}
