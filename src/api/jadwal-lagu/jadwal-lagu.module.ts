import { Module } from '@nestjs/common';
import { JadwalLaguService } from './jadwal-lagu.service';
import { JadwalLaguController } from './jadwal-lagu.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [JadwalLaguController],
  providers: [JadwalLaguService, PrismaService],
})
export class JadwalLaguModule {}
