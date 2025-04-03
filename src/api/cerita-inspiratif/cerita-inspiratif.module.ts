import { Module } from '@nestjs/common';
import { CeritaInspiratifService } from './cerita-inspiratif.service';
import { CeritaInspiratifController } from './cerita-inspiratif.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CeritaInspiratifController],
  providers: [CeritaInspiratifService, PrismaService],
})
export class CeritaInspiratifModule {}
