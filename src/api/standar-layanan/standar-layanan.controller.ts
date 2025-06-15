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
  Res,
} from '@nestjs/common';
import { StandarLayananService } from './standar-layanan.service';
import { CreateStandarLayananDto } from './dto/create-standar-layanan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/standar-layanan')
export class StandarLayananController {
  constructor(private readonly standarLayananService: StandarLayananService) {}

  @Post()
  update(@Body() body: CreateStandarLayananDto) {
    return this.standarLayananService.update(body);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async updateWithFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateStandarLayananDto,
  ) {
    return this.standarLayananService.updateWithFile(createDto, file);
  }

  @Public()
  @Get()
  findAll() {
    return this.standarLayananService.findAll();
  }

  @Get('file/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    return this.standarLayananService.getFile(filename, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.standarLayananService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.standarLayananService.remove(+id);
  }
}
