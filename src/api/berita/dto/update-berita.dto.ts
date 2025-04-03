import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBeritaDto {
  @IsString()
  @IsNotEmpty()
  readonly judul: string;

  @IsString()
  @IsNotEmpty()
  readonly penulis: string;

  @IsString()
  @IsNotEmpty()
  readonly lokasi: string;

  @IsString()
  @IsNotEmpty()
  readonly deskripsi: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  readonly tanggal: string;

  @IsString()
  @IsNotEmpty()
  readonly kategori: string;

  @IsString()
  @IsNotEmpty()
  readonly detail: string;

  @IsString()
  @IsNotEmpty()
  readonly updated_by_username: string;
}
