import { Module } from '@nestjs/common';
import { BeritaService } from './berita.service';
import { BeritaController } from './berita.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BeritaController],
  providers: [BeritaService, PrismaService],
})
export class BeritaModule {}
