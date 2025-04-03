import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateKepalaDto {
  @IsString()
  @IsNotEmpty()
  readonly nama: string;
}
