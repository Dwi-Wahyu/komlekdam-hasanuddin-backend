import { Module } from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { LaporanController } from './laporan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LaporanController],
  providers: [LaporanService, PrismaService],
})
export class LaporanModule {}
