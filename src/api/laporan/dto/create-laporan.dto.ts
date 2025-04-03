import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLaporanDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  nomor: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  pesan: string;
}
