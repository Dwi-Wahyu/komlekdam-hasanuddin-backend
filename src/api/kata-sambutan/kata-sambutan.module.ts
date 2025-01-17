import { Module } from '@nestjs/common';
import { KataSambutanService } from './kata-sambutan.service';
import { KataSambutanController } from './kata-sambutan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KataSambutanController],
  providers: [KataSambutanService, PrismaService],
})
export class KataSambutanModule {}
