import { PartialType } from '@nestjs/mapped-types';
import { CreateStatistikDto } from './create-statistik.dto';

type Data = {
  id: string;
  kategori: String;
  persentase: String;
};

export class UpdateStatistikDto extends PartialType(CreateStatistikDto) {
  data: Data[];
}
