import { Module } from '@nestjs/common';
import { PejabatService } from './pejabat.service';
import { PejabatController } from './pejabat.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PejabatController],
  providers: [PejabatService, PrismaService],
})
export class PejabatModule {}
