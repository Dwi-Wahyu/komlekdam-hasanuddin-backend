import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKepalaDto {
  @IsString()
  @IsNotEmpty()
  readonly nama: string;

  @IsString()
  @IsNotEmpty()
  readonly jabatan: string;
}
