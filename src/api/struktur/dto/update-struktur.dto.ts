import { PartialType } from '@nestjs/mapped-types';
import { CreateStrukturDto } from './create-struktur.dto';

export class UpdateStrukturDto extends PartialType(CreateStrukturDto) {
  urutan: number;
}
