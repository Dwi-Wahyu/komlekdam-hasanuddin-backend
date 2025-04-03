import { Module } from '@nestjs/common';
import { KegiatanService } from './kegiatan.service';
import { KegiatanController } from './kegiatan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KegiatanController],
  providers: [KegiatanService, PrismaService],
})
export class KegiatanModule {}
