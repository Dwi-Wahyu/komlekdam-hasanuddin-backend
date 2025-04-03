import {
  Injectable,
  InternalServerErrorException,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateLiveYoutubeDto } from './dto/create-live-youtube.dto';
import { UpdateLiveYoutubeDto } from './dto/update-live-youtube.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { log } from 'console';

@Injectable()
export class LiveYoutubeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLiveYoutubeDto: CreateLiveYoutubeDto) {
    return 'This action adds a new liveYoutube';
  }

  async findAll() {
    try {
      const live = await this.prismaService.live_youtube.findFirst();

      log(live);

      return live;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} liveYoutube`;
  }

  async update(
    updateLiveYoutubeDto: UpdateLiveYoutubeDto,
    thumbnail: Express.Multer.File,
  ) {
    const { buffer, originalname } = thumbnail;

    try {
      const { link } = updateLiveYoutubeDto;

      const previousData = await this.prismaService.live_youtube.findFirst();

      if (previousData) {
        const fileToDelete = join(
          process.cwd(),
          'public',
          'live-youtube',
          previousData.thumbnailPath,
        );
        unlinkSync(fileToDelete);
      }

      const thumbnailPath = Date.now() + '-' + originalname;
      const thumbnailAbsolutePath = join(
        process.cwd(),
        'public',
        'live-youtube',
        thumbnailPath,
      );

      writeFileSync(thumbnailAbsolutePath, buffer);

      const updateLiveYoutube = await this.prismaService.live_youtube.upsert({
        where: {
          id: 1,
        },
        create: {
          link,
          thumbnailPath,
        },
        update: {
          link,
          thumbnailPath,
        },
      });

      log(updateLiveYoutube);

      return {
        success: true,
        message: 'Berhasil update live',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} liveYoutube`;
  }
}
