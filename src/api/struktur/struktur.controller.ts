import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StrukturService } from './struktur.service';
import { CreateStrukturDto } from './dto/create-struktur.dto';
import { UpdateStrukturDto } from './dto/update-struktur.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GambarValidationPipe } from '../galeri/gambar.validation.pipe';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/struktur')
export class StrukturController {
  constructor(private readonly strukturService: StrukturService) {}

  @Post()
  @UseInterceptors(FileInterceptor('gambar'))
  create(
    @Body() createStrukturDto: CreateStrukturDto,
    @UploadedFile(new GambarValidationPipe()) gambar: Express.Multer.File,
  ) {
    return this.strukturService.create(createStrukturDto, gambar);
  }

  @Public()
  @Get()
  findAll() {
    return this.strukturService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStrukturDto: UpdateStrukturDto,
  ) {
    return this.strukturService.update(id, updateStrukturDto);
  }

  @Patch('/ganti-foto/:id')
  @UseInterceptors(FileInterceptor('gambar'))
  updatePhoto(
    @Param('id') id: string,
    @Body() body: { previousPhotoPath: string },
    @UploadedFile(new GambarValidationPipe()) gambar: Express.Multer.File,
  ) {
    return this.strukturService.updatePhoto(id, body, gambar);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.strukturService.remove(id);
  }
}
