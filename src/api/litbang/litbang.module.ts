import { Module } from '@nestjs/common';
import { LitbangService } from './litbang.service';
import { LitbangController } from './litbang.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LitbangController],
  providers: [LitbangService, PrismaService],
})
export class LitbangModule {}
