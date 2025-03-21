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
import { CreateKepalaSatuanLampauDto } from './dto/create-kepala-satuan-lampau.dto';
import { UpdateKepalaSatuanLampauDto } from './dto/update-kepala-satuan-lampau.dto';
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
  @UseInterceptors(FileInterceptor('pasfoto'))
  create(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Body() createKepalaSatuanLampauDto: CreateKepalaSatuanLampauDto,
  ) {
    return this.kepalaSatuanLampauService.create(
      pasfoto,
      createKepalaSatuanLampauDto,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.kepalaSatuanLampauService.findAll();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.kepalaSatuanLampauService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kepalaSatuanLampauService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKepalaSatuanLampauDto: UpdateKepalaSatuanLampauDto,
  ) {
    return this.kepalaSatuanLampauService.update(
      +id,
      updateKepalaSatuanLampauDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kepalaSatuanLampauService.remove(+id);
  }
}
