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
import { BeritaService } from './berita.service';
import { CreateBeritaDto } from './dto/create-berita.dto';
import { UpdateBeritaDto } from './dto/update-berita.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThumbnailValidationPipe } from './thumbnail.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/berita')
export class BeritaController {
  constructor(private readonly beritaService: BeritaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Body() createBeritaDto: CreateBeritaDto,
  ) {
    return this.beritaService.create(thumbnail, createBeritaDto);
  }

  @Get()
  findAll() {
    return this.beritaService.findAll();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.beritaService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beritaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeritaDto: UpdateBeritaDto) {
    return this.beritaService.update(+id, updateBeritaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beritaService.remove(+id);
  }
}
