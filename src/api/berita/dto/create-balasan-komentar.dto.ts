import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBalasanKomentarDto {
  @IsNumber()
  readonly id_komentar: number;

  @IsNumber()
  readonly id_berita: number;

  @IsString()
  @IsNotEmpty()
  readonly nama: string;

  @IsString()
  @IsNotEmpty()
  readonly isi: string;

  @IsString()
  @IsNotEmpty()
  readonly kepada: string;

  @IsNumber()
  readonly id_user: number;
}
