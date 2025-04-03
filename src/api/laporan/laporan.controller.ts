import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { UpdateLaporanDto } from './dto/update-laporan.dto';
import { Public } from 'src/auth/PublicDecorator';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Response } from 'express';

@Controller('api/laporan')
export class LaporanController {
  constructor(private readonly laporanService: LaporanService) {}

  @Public()
  @Post()
  create(@Body() createLaporanDto: CreateLaporanDto) {
    return this.laporanService.create(createLaporanDto);
  }

  @Get()
  findAll() {
    return this.laporanService.findAll();
  }

  @Public()
  @Get('export-excel')
  exportExcel(@Res() res: Response) {
    return this.laporanService.exportExcel(res);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.laporanService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laporanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaporanDto: UpdateLaporanDto) {
    return this.laporanService.update(+id, updateLaporanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laporanService.remove(+id);
  }
}
