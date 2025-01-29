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
import { KomentarService } from './komentar.service';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/komentar')
export class KomentarController {
  constructor(private readonly komentarService: KomentarService) {}

  @Post()
  create(@Body() createKomentarDto: CreateKomentarDto) {
    return this.komentarService.create(createKomentarDto);
  }

  @Get()
  findAll() {
    return this.komentarService.findAll();
  }

  @Get('/data')
  findData(@Query() query: DatatableQuery) {
    return this.komentarService.findData(query);
  }

  @Public()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKomentarDto: UpdateKomentarDto,
  ) {
    return this.komentarService.update(id, updateKomentarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.komentarService.remove(id);
  }
}
