import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDokumentasiKegiatanDto {
  @IsString()
  @IsNotEmpty()
  readonly kategori: string;
}
