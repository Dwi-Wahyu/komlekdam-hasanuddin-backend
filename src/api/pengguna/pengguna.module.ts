import { Module } from '@nestjs/common';
import { PenggunaService } from './pengguna.service';
import { PenggunaController } from './pengguna.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [PenggunaController],
  providers: [PenggunaService, PrismaService, AuthService],
})
export class PenggunaModule {}
