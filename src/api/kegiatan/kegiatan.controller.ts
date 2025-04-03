import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { KegiatanService } from './kegiatan.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';
import { UpdateKegiatanDto } from './dto/update-kegiatan.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { KegiatanValidationPipe } from './kegiatan.validation.pipe';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { CreateDokumentasiKegiatanDto } from './dto/create-dokumentasi-kegiatan.dto';
import { VideoValidationPipe } from './video.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';
import { DokumentasiValidationPipe } from '../mitra/dokumentasi.validation.pipe';
import { log } from 'console';

@Controller('api/kegiatan')
export class KegiatanController {
  constructor(private readonly kegiatanService: KegiatanService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'dokumentasi', maxCount: 5 },
    ]),
  )
  create(
    @UploadedFiles(new KegiatanValidationPipe())
    files: {
      thumbnail: Express.Multer.File[];
      video: Express.Multer.File[];
      dokumentasi: Express.Multer.File[];
    },
    @Body() createKegiatanDto: CreateKegiatanDto,
  ) {
    return this.kegiatanService.create(
      files.thumbnail,
      files.video,
      files.dokumentasi,
      createKegiatanDto,
    );
  }

  @Patch('hapus-dokumentasi')
  hapusDokumentasi(
    @Body()
    hapusDokumentasiDto: {
      dokumentasiDipilih: string;
      kategori: string;
    },
  ) {
    return this.kegiatanService.hapusDokumentasi(hapusDokumentasiDto);
  }

  @Post('ganti-thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updateThumbnail(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.updateThumbnail(+id, thumbnail, body);
  }

  @Post('ganti-video/:id')
  @UseInterceptors(FileInterceptor('video'))
  updateVideo(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.updateVideo(+id, video, body);
  }

  @Post('dokumentasi/:id')
  @UseInterceptors(FileInterceptor('gambar'))
  createDokumentasi(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Param('id') id: string,
    @Body() createDokumentasiKegiatanDto: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.createDokumentasi(
      +id,
      gambar,
      createDokumentasiKegiatanDto,
    );
  }

  @Public()
  @Get()
  findAll(@Query() query: { kategori: string }) {
    return this.kegiatanService.findAll(query);
  }

  @Public()
  @Get('lampau')
  findLampau(@Query() query: { kategori?: string; judul?: string }) {
    return this.kegiatanService.findLampau(query);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.kegiatanService.findData(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKegiatanDto: UpdateKegiatanDto,
  ) {
    return this.kegiatanService.update(+id, updateKegiatanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanService.remove(+id);
  }
}
