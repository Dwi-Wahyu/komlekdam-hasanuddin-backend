import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateKomentarDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly nama: string;

  @IsString()
  @IsNotEmpty()
  readonly isi: string;

  @IsNumber()
  readonly id_user: number;
}
