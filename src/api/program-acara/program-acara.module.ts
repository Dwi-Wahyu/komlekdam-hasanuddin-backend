import { Module } from '@nestjs/common';
import { ProgramAcaraService } from './program-acara.service';
import { ProgramAcaraController } from './program-acara.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProgramAcaraController],
  providers: [ProgramAcaraService, PrismaService],
})
export class ProgramAcaraModule {}
