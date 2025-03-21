import { PartialType } from '@nestjs/mapped-types';
import { CreateKepalaSatuanLampauDto } from './create-kepala-satuan-lampau.dto';

export class UpdateKepalaSatuanLampauDto extends PartialType(CreateKepalaSatuanLampauDto) {}
