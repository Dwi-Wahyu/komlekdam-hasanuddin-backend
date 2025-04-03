import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKegiatanDto {
  @IsString()
  @IsNotEmpty()
  readonly judul: string;

  @IsString()
  @IsNotEmpty()
  readonly deskripsi: string;

  @IsString()
  @IsNotEmpty()
  readonly tanggal: string;

  @IsString()
  @IsNotEmpty()
  readonly kategori: string;

  @IsString()
  @IsNotEmpty()
  readonly detail: string;
}
