import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProgramAcaraService } from './program-acara.service';
import { CreateProgramAcaraDto } from './dto/create-program-acara.dto';
import { UpdateProgramAcaraDto } from './dto/update-program-acara.dto';
import { Public } from 'src/auth/PublicDecorator';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Controller('api/program-acara')
export class ProgramAcaraController {
  constructor(private readonly programAcaraService: ProgramAcaraService) {}

  @Post()
  create(@Body() createProgramAcaraDto: CreateProgramAcaraDto) {
    return this.programAcaraService.create(createProgramAcaraDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.programAcaraService.findAll();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.programAcaraService.findData(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programAcaraService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgramAcaraDto: UpdateProgramAcaraDto,
  ) {
    return this.programAcaraService.update(id, updateProgramAcaraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programAcaraService.remove(id);
  }
}
