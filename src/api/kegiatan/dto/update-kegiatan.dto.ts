import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateKegiatanDto {
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
  readonly detail: string;
}
