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
} from '@nestjs/common';
import { LiveYoutubeService } from './live-youtube.service';
import { CreateLiveYoutubeDto } from './dto/create-live-youtube.dto';
import { UpdateLiveYoutubeDto } from './dto/update-live-youtube.dto';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/PublicDecorator';

@Controller('api/live-youtube')
export class LiveYoutubeController {
  constructor(private readonly liveYoutubeService: LiveYoutubeService) {}

  @Post()
  create(@Body() createLiveYoutubeDto: CreateLiveYoutubeDto) {
    return this.liveYoutubeService.create(createLiveYoutubeDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.liveYoutubeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.liveYoutubeService.findOne(+id);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('thumbnail'))
  update(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Body() updateLiveYoutubeDto: UpdateLiveYoutubeDto,
  ) {
    return this.liveYoutubeService.update(updateLiveYoutubeDto, thumbnail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.liveYoutubeService.remove(+id);
  }
}
