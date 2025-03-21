import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ProgramValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { thumbnail, dokumentasi } = value;

    if (!thumbnail || !dokumentasi) {
      throw new BadRequestException('Thumbnail and dokumentasi are required');
    }

    if (thumbnail.length > 1) {
      throw new BadRequestException('Only one thumbnail is allowed');
    }

    if (dokumentasi.length > 5) {
      throw new BadRequestException(
        'Maximum of 5 dokumentasi files are allowed',
      );
    }

    return value;
  }
}
