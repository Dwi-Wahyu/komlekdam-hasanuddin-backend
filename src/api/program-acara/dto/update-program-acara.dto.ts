import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramAcaraDto } from './create-program-acara.dto';

export class UpdateProgramAcaraDto extends PartialType(CreateProgramAcaraDto) {}
