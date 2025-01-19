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
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GambarValidationPipe } from '../galeri/gambar.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';
import { log } from 'console';

@Controller('api/artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(
    @Body() createArtikelDto: CreateArtikelDto,
    @UploadedFile(new GambarValidationPipe()) thumbnail: Express.Multer.File,
  ) {
    return this.artikelService.create(createArtikelDto, thumbnail);
  }

  @Public()
  @Get()
  findArtikel(@Query() query: { take: string }) {
    return this.artikelService.findArtikel(query);
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.artikelService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artikelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtikelDto: UpdateArtikelDto) {
    return this.artikelService.update(id, updateArtikelDto);
  }

  @Public()
  @Patch('/like/:id')
  handleLike(@Param('id') id: string) {
    return this.artikelService.handleLike(id);
  }

  @Public()
  @Patch('/dislike/:id')
  handleDislike(@Param('id') id: string) {
    return this.artikelService.handleDislike(id);
  }

  @Patch('/ganti-thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updatePhoto(
    @Param('id') id: string,
    @Body() body: { previousPhotoPath: string },
    @UploadedFile(new GambarValidationPipe()) thumbnail: Express.Multer.File,
  ) {
    return this.artikelService.updatePhoto(id, body, thumbnail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artikelService.remove(id);
  }
}
