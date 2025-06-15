import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStandarLayananDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
