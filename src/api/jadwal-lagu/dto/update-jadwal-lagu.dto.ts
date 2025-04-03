import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateJadwalLaguDto {
  @IsString()
  @IsNotEmpty()
  judul: string;

  @IsString()
  @IsNotEmpty()
  mulai: string;

  @IsString()
  @IsNotEmpty()
  selesai: string;
}
