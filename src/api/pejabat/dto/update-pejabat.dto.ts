import { PartialType } from '@nestjs/mapped-types';
import { CreatePejabatDto } from './create-pejabat.dto';

export class UpdatePejabatDto extends PartialType(CreatePejabatDto) {}
