import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { log } from 'console';
import * as path from 'path';

@Injectable()
export class GambarValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Please insert file');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size exceeds 5MB');
    }

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Invalid file type');
    }

    return file;
  }
}
