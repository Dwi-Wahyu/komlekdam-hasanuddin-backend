import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { JadwalLaguService } from './jadwal-lagu.service';
import { CreateJadwalLaguDto } from './dto/create-jadwal-lagu.dto';
import { UpdateJadwalLaguDto } from './dto/update-jadwal-lagu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LaguValidationPipe } from './lagu.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/jadwal-lagu')
export class JadwalLaguController {
  constructor(private readonly jadwalLaguService: JadwalLaguService) {}

  @Post()
  @UseInterceptors(FileInterceptor('lagu'))
  create(
    @UploadedFile(new LaguValidationPipe()) lagu: Express.Multer.File,
    @Body() createJadwalLaguDto: CreateJadwalLaguDto,
  ) {
    return this.jadwalLaguService.create(lagu, createJadwalLaguDto);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.jadwalLaguService.findData(query);
  }

  @Get()
  findAll() {
    return this.jadwalLaguService.findAll();
  }

  @Public()
  @Get('sekarang')
  findNow() {
    return this.jadwalLaguService.findNow();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jadwalLaguService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJadwalLaguDto: UpdateJadwalLaguDto,
  ) {
    return this.jadwalLaguService.update(+id, updateJadwalLaguDto);
  }

  @Post('ganti-lagu/:id')
  @UseInterceptors(FileInterceptor('lagu'))
  updateLagu(
    @UploadedFile(new LaguValidationPipe()) lagu: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.jadwalLaguService.updateLagu(+id, lagu);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jadwalLaguService.remove(+id);
  }
}
