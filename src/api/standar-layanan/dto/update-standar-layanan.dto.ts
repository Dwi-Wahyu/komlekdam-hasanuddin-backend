import { PartialType } from '@nestjs/mapped-types';
import { CreateStandarLayananDto } from './create-standar-layanan.dto';

export class UpdateStandarLayananDto extends PartialType(CreateStandarLayananDto) {}
