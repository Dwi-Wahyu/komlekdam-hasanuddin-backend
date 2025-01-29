import { Module } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { KomentarController } from './komentar.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KomentarController],
  providers: [KomentarService, PrismaService],
})
export class KomentarModule {}
