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
  BadRequestException,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProgramValidationPipe } from './program.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'dokumentasi', maxCount: 5 },
    ]),
  )
  create(
    @UploadedFiles(new ProgramValidationPipe())
    files: {
      thumbnail: Express.Multer.File[];
      dokumentasi: Express.Multer.File[];
    },
    @Body() createSuratMasukDto: CreateProgramDto,
  ) {
    return this.programService.create(
      files.thumbnail,
      files.dokumentasi,
      createSuratMasukDto,
    );
  }

  @Get()
  findAll() {
    return this.programService.findAll();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.programService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programService.update(id, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(id);
  }
}
