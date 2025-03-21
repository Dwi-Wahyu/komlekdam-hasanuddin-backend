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
import { MitraService } from './mitra.service';
import { CreateMitraDto } from './dto/create-mitra.dto';
import { UpdateMitraDto } from './dto/update-mitra.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasfotoValidationPipe } from '../pejabat/pasfoto.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/mitra')
export class MitraController {
  constructor(private readonly mitraService: MitraService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile(new PasfotoValidationPipe()) logo: Express.Multer.File,
    @Body() createMitraDto: CreateMitraDto,
  ) {
    return this.mitraService.create(logo, createMitraDto);
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.mitraService.findData(query);
  }

  @Get()
  findAll() {
    return this.mitraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mitraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMitraDto: UpdateMitraDto) {
    return this.mitraService.update(+id, updateMitraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mitraService.remove(+id);
  }
}
