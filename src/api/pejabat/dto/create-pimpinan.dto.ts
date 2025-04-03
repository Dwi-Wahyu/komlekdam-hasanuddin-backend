import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePimpinanDto {
  @IsString()
  @IsNotEmpty()
  readonly nama: string;

  @IsString()
  @IsNotEmpty()
  readonly jabatan: string;
}
