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
  Put,
} from '@nestjs/common';
import { BeritaService } from './berita.service';
import { CreateBeritaDto } from './dto/create-berita.dto';
import { UpdateBeritaDto } from './dto/update-berita.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThumbnailValidationPipe } from './thumbnail.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { CreateBalasanKomentarDto } from './dto/create-balasan-komentar.dto';

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

  @Public()
  @Get('komentar/:id_berita')
  findAllKomentarInBerita(@Param('id_berita') id_berita: string) {
    return this.beritaService.findAllKomentarInBerita(+id_berita);
  }

  @Public()
  @Post('komentar')
  createKomentar(@Body() createKomentarDto: CreateKomentarDto) {
    return this.beritaService.createKomentar(createKomentarDto);
  }

  @Public()
  @Post('komentar/balas')
  createBalasanKomentar(
    @Body() createBalasanKomentarDto: CreateBalasanKomentarDto,
  ) {
    return this.beritaService.createBalasanKomentar(createBalasanKomentarDto);
  }

  @Public()
  @Patch(':konten/:id/like')
  handleLike(@Param('id') id: string, @Param('konten') konten: string) {
    return this.beritaService.handleLike(+id, konten);
  }

  @Public()
  @Patch(':konten/:id/dislike')
  handleDislike(@Param('id') id: string, @Param('konten') konten: string) {
    return this.beritaService.handleDislike(+id, konten);
  }

  @Public()
  @Get('kategori/:kategori')
  findAllByKategori(
    @Param('kategori') kategori: string,
    @Query() query: { page: string; limit: string },
  ) {
    return this.beritaService.findAllByKategori(kategori, query);
  }

  @Public()
  @Get('populer')
  findPopuler(@Query() query: { excludeId: string }) {
    return this.beritaService.findPopuler(query);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.beritaService.findData(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beritaService.findOne(+id);
  }

  @Public()
  @Put(':id/bagikan')
  tambahkanDibagikan(@Param('id') id: string) {
    return this.beritaService.tambahkanDibagikan(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  update(
    @Param('id') id: string,
    @Body() updateBeritaDto: UpdateBeritaDto,
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
  ) {
    return this.beritaService.update(+id, updateBeritaDto, thumbnail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beritaService.remove(+id);
  }
}
