import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatistikService } from './statistik.service';
import { CreateStatistikDto } from './dto/create-statistik.dto';
import { UpdateStatistikDto } from './dto/update-statistik.dto';
import { Public } from 'src/auth/PublicDecorator';
import { CreateDataStatistikDto } from './dto/create-data-statistik.dto';

@Controller('api/statistik')
export class StatistikController {
  constructor(private readonly statistikService: StatistikService) {}

  @Post()
  createStatistic(@Body() createStatistikDto: CreateStatistikDto) {
    return this.statistikService.createStatistic(createStatistikDto);
  }

  @Post('/data')
  createStatisticData(@Body() createDataStatistics: CreateDataStatistikDto) {
    return this.statistikService.createDataStatistics(createDataStatistics);
  }

  @Public()
  @Get()
  findAll() {
    return this.statistikService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statistikService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatistikDto: UpdateStatistikDto,
  ) {
    return this.statistikService.update(id, updateStatistikDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statistikService.remove(id);
  }
}
