import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KataSambutanService } from './kata-sambutan.service';
import { UpdateKataSambutanDto } from './dto/update-kata-sambutan.dto';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/kata-sambutan')
export class KataSambutanController {
  constructor(private readonly kataSambutanService: KataSambutanService) {}

  @Public()
  @Get()
  findAll() {
    return this.kataSambutanService.find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKataSambutanDto: UpdateKataSambutanDto,
  ) {
    return this.kataSambutanService.update(id, updateKataSambutanDto);
  }
}
