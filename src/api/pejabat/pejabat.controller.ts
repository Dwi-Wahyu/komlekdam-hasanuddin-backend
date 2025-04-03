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
import { CreatePimpinanDto } from './dto/create-pimpinan.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasfotoValidationPipe } from './pasfoto.validation.pipe';
import { UpdateKepalaDto } from './dto/update-pimpinan.dto';
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
  @Get('pimpinan')
  getAllPimpinan() {
    return this.pejabatService.getAllPimpinan();
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.pejabatService.findData(query);
  }

  @Post('pimpinan')
  @UseInterceptors(FileInterceptor('pasfoto'))
  createPimpinan(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Body() createPimpinanDto: CreatePimpinanDto,
  ) {
    return this.pejabatService.createPimpinan(pasfoto, createPimpinanDto);
  }

  @Get('pimpinan/:jabatan')
  getOnePimpinan(@Param('jabatan') jabatan: string) {
    return this.pejabatService.getOnePimpinan(jabatan);
  }

  @Patch('pimpinan/:jabatan')
  updatePimpinan(
    @Param('jabatan') jabatan: string,
    @Body() updatePimpinanDto: UpdateKepalaDto,
  ) {
    return this.pejabatService.updatePimpinan(jabatan, updatePimpinanDto);
  }

  @Post('ganti-pasfoto/:id')
  @UseInterceptors(FileInterceptor('pasfoto'))
  updatePasfoto(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.pejabatService.updatePasfoto(+id, pasfoto);
  }

  @Post('pimpinan/ganti-pasfoto/:jabatan')
  @UseInterceptors(FileInterceptor('pasfoto'))
  updatePasfotoPimpinan(
    @UploadedFile(new PasfotoValidationPipe()) pasfoto: Express.Multer.File,
    @Param('jabatan') jabatan: string,
  ) {
    return this.pejabatService.updatePasfotoPimpinan(jabatan, pasfoto);
  }

  @Public()
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
