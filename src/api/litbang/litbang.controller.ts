import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { LitbangService } from './litbang.service';
import { CreateLitbangDto } from './dto/create-litbang.dto';
import { UpdateLitbangDto } from './dto/update-litbang.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { LitbangValidationPipe } from './litbang.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { DokumentasiValidationPipe } from '../mitra/dokumentasi.validation.pipe';
import { UpdateLitbangValidationPipe } from './update.litbang.validation.pipe';
import { Public } from 'src/auth/PublicDecorator';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { VideoValidationPipe } from '../kegiatan/video.validation.pipe';

@Controller('api/litbang')
export class LitbangController {
  constructor(private readonly litbangService: LitbangService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'dokumentasi', maxCount: 5 },
    ]),
  )
  create(
    @UploadedFiles(new LitbangValidationPipe())
    files: {
      video: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
      dokumentasi: Express.Multer.File[];
    },
    @Body() createLitbangDto: CreateLitbangDto,
  ) {
    return this.litbangService.create(
      files.thumbnail,
      files.video,
      files.dokumentasi,
      createLitbangDto,
    );
  }

  @Patch('hapus-dokumentasi')
  hapusDokumentasi(
    @Body()
    hapusDokumentasiDto: {
      dokumentasiDipilih: string;
    },
  ) {
    return this.litbangService.hapusDokumentasi(hapusDokumentasiDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLitbangDto: UpdateLitbangDto) {
    return this.litbangService.update(+id, updateLitbangDto);
  }

  @Post('ganti-thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updateThumbnail(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.updateThumbnail(+id, thumbnail);
  }

  @Post('ganti-video/:id')
  @UseInterceptors(FileInterceptor('video'))
  updateVideo(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.updateVideo(+id, video);
  }

  @Post('dokumentasi/:id')
  @UseInterceptors(FileInterceptor('gambar'))
  createDokumentasi(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.createDokumentasi(+id, gambar);
  }

  @Public()
  @Get('lampau')
  findLampau(@Query() query: { judul?: string }) {
    return this.litbangService.findLampau(query);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.litbangService.findData(query);
  }

  @Public()
  @Get()
  findAll() {
    return this.litbangService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.litbangService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.litbangService.remove(+id);
  }
}
