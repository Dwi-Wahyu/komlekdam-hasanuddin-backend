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
import { PejabatService } from './pejabat.service';
import { CreatePejabatDto } from './dto/create-pejabat.dto';
import { UpdatePejabatDto } from './dto/update-pejabat.dto';
import { CreateKepalaDto } from './dto/create-kepala.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasfotoValidationPipe } from './pasfoto.validation.pipe';
import { UpdateKepalaDto } from './dto/update-kepala.dto';
import { Public } from 'src/auth/PublicDecorator';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/pejabat')
export class PejabatController {
  constructor(private readonly pejabatService: PejabatService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pasfoto'))
  create(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Body() createPejabatDto: CreatePejabatDto,
  ) {
    return this.pejabatService.create(pasfoto, createPejabatDto);
  }

  @Public()
  @Get('kepala')
  getKepala() {
    return this.pejabatService.getKepala();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.pejabatService.findData(query);
  }

  @Post('kepala')
  @UseInterceptors(FileInterceptor('pasfoto'))
  createKepala(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Body() createKepalaDto: CreateKepalaDto,
  ) {
    return this.pejabatService.createKepala(pasfoto, createKepalaDto);
  }

  @Get('kepala/:jabatan')
  getOneKepala(@Param('jabatan') jabatan: string) {
    return this.pejabatService.getOneKepala(jabatan);
  }

  @Patch('kepala/:jabatan')
  updateKepala(
    @Param('jabatan') jabatan: string,
    @Body() updateKepalaDto: UpdateKepalaDto,
  ) {
    return this.pejabatService.updateKepala(jabatan, updateKepalaDto);
  }

  @Post('pasfoto/:id')
  @UseInterceptors(FileInterceptor('pasfoto'))
  updatePasfoto(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.pejabatService.updatePasfoto(+id, pasfoto);
  }

  @Post('kepala/pasfoto/:jabatan')
  @UseInterceptors(FileInterceptor('pasfoto'))
  updatePasfotoKepala(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Param('jabatan') jabatan: string,
  ) {
    return this.pejabatService.updatePasfotoKepala(jabatan, pasfoto);
  }

  @Get()
  findAll() {
    return this.pejabatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pejabatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePejabatDto: UpdatePejabatDto) {
    return this.pejabatService.update(+id, updatePejabatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pejabatService.remove(+id);
  }
}
