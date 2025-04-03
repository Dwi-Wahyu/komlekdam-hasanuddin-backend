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
import { KepalaSatuanLampauService } from './kepala-satuan-lampau.service';
import { PasfotoValidationPipe } from '../pejabat/pasfoto.validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/PublicDecorator';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/kepala-satuan-lampau')
export class KepalaSatuanLampauController {
  constructor(
    private readonly kepalaSatuanLampauService: KepalaSatuanLampauService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  create(@UploadedFile(new PasfotoValidationPipe()) foto: Express.Multer.File) {
    return this.kepalaSatuanLampauService.create(foto);
  }

  @Public()
  @Get()
  findAll() {
    return this.kepalaSatuanLampauService.findAll();
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.kepalaSatuanLampauService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kepalaSatuanLampauService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('foto'))
  update(
    @Param('id') id: string,
    @UploadedFile(new PasfotoValidationPipe()) foto: Express.Multer.File,
  ) {
    return this.kepalaSatuanLampauService.update(+id, foto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kepalaSatuanLampauService.remove(+id);
  }
}
