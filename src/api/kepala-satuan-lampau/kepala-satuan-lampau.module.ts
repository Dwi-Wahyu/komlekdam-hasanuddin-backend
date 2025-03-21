import { Module } from '@nestjs/common';
import { KepalaSatuanLampauService } from './kepala-satuan-lampau.service';
import { KepalaSatuanLampauController } from './kepala-satuan-lampau.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [KepalaSatuanLampauController],
  providers: [KepalaSatuanLampauService, PrismaService],
})
export class KepalaSatuanLampauModule {}
