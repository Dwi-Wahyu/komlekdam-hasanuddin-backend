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
import { CeritaInspiratifService } from './cerita-inspiratif.service';
import { CreateCeritaInspiratifDto } from './dto/create-cerita-inspiratif.dto';
import { UpdateCeritaInspiratifDto } from './dto/update-cerita-inspiratif.dto';
import { CeritaInspiratifValidationPipe } from './cerita-inspiratif.validation.pipe';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { Public } from 'src/auth/PublicDecorator';
import { VideoValidationPipe } from '../kegiatan/video.validation.pipe';
import { CeritaInspiratifStorage } from './cerita-inspiratif.storage';

@Controller('api/cerita-inspiratif')
export class CeritaInspiratifController {
  constructor(
    private readonly ceritaInspiratifService: CeritaInspiratifService,
  ) {}

  @Post()
  @UseInterceptors(CeritaInspiratifStorage)
  create(
    @UploadedFiles(new CeritaInspiratifValidationPipe())
    files: {
      thumbnail: Express.Multer.File[];
      video: Express.Multer.File[];
    },
    @Body() createCeritaInspiratifDto: CreateCeritaInspiratifDto,
  ) {
    return this.ceritaInspiratifService.create(
      files.thumbnail[0],
      files.video[0],
      createCeritaInspiratifDto,
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.ceritaInspiratifService.findAll();
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.ceritaInspiratifService.findData(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ceritaInspiratifService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCeritaInspiratifDto: UpdateCeritaInspiratifDto,
  ) {
    return this.ceritaInspiratifService.update(+id, updateCeritaInspiratifDto);
  }

  @Post('ganti-thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updateThumbnail(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.ceritaInspiratifService.updateThumbnail(+id, thumbnail);
  }

  @Post('ganti-video/:id')
  @UseInterceptors(FileInterceptor('video'))
  updateVideo(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.ceritaInspiratifService.updateVideo(+id, video);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ceritaInspiratifService.remove(+id);
  }
}
