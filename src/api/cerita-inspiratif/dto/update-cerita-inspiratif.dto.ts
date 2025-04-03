import { PartialType } from '@nestjs/mapped-types';
import { CreateCeritaInspiratifDto } from './create-cerita-inspiratif.dto';

export class UpdateCeritaInspiratifDto extends PartialType(
  CreateCeritaInspiratifDto,
) {}
