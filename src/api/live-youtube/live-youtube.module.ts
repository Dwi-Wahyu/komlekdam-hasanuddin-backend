import { Module } from '@nestjs/common';
import { LiveYoutubeService } from './live-youtube.service';
import { LiveYoutubeController } from './live-youtube.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LiveYoutubeController],
  providers: [LiveYoutubeService, PrismaService],
})
export class LiveYoutubeModule {}
