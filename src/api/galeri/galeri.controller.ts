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
import { GaleriService } from './galeri.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
import { GambarValidationPipe } from './gambar.validation.pipe';
import { Public } from 'src/auth/PublicDecorator';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/galeri')
export class GaleriController {
  constructor(private readonly galeriService: GaleriService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('gambar'))
  UploadGaleri(
    @UploadedFile(new GambarValidationPipe()) gambar: Express.Multer.File,
  ) {
    return this.galeriService.postGambar(gambar);
  }

  @Public()
  @Get('')
  GetAllGambar() {
    return this.galeriService.getAllGambar();
  }

  @Get('/data')
  GetGambar(@Query() query: DatatableQuery) {
    return this.galeriService.getGambar(query);
  }

  @Patch('/toggle-tampilkan/:id')
  ToggleTampilkan(@Param('id') id: string) {
    return this.galeriService.toggleTampilkan(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeriService.remove(id);
  }
}
