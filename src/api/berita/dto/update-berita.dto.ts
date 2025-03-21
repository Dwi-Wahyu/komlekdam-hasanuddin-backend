import { PartialType } from '@nestjs/mapped-types';
import { CreateBeritaDto } from './create-berita.dto';

export class UpdateBeritaDto extends PartialType(CreateBeritaDto) {}
