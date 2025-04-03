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
import { DokumentasiValidationPipe } from './dokumentasi.validation.pipe';
import { CreateDokumentasiMitraDto } from './dto/create-dokumentasi.dto';
import { Public } from 'src/auth/PublicDecorator';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';

@Controller('api/mitra')
export class MitraController {
  constructor(private readonly mitraService: MitraService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile(new PasfotoValidationPipe()) logo: Express.Multer.File,
    @Body() createMitraDto: CreateMitraDto,
    @Param('id') id: string,
  ) {
    return this.mitraService.create(logo, createMitraDto);
  }

  @Post('ganti-logo/:id')
  @UseInterceptors(FileInterceptor('logo'))
  updateLogo(
    @UploadedFile(new ThumbnailValidationPipe()) logo: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.mitraService.updateLogo(+id, logo);
  }

  @Post('dokumentasi/:id')
  @UseInterceptors(FileInterceptor('gambar'))
  createDokumentasi(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Body() createDokumentasiMitraDto: CreateDokumentasiMitraDto,
    @Param('id') id: string,
  ) {
    return this.mitraService.createDokumentasi(
      +id,
      gambar,
      createDokumentasiMitraDto,
    );
  }

  @Patch('hapus-dokumentasi/:id')
  hapusDokumentasi(
    @Param('id') id: string,
    @Body() hapusDokumentasiDto: { dokumentasiDipilih: string },
  ) {
    return this.mitraService.hapusDokumentasi(+id, hapusDokumentasiDto);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.mitraService.findData(query);
  }

  @Public()
  @Get()
  findAll() {
    return this.mitraService.findAll();
  }

  @Public()
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
