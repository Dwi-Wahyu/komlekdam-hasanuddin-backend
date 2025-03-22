import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BeritaModule } from './api/berita/berita.module';
import { LaporanModule } from './api/laporan/laporan.module';
import { ProgramModule } from './api/program/program.module';
import { PejabatModule } from './api/pejabat/pejabat.module';
import { KepalaSatuanLampauModule } from './api/kepala-satuan-lampau/kepala-satuan-lampau.module';
import { MitraModule } from './api/mitra/mitra.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    PrismaModule,
    AuthModule,
    BeritaModule,
    LaporanModule,
    ProgramModule,
    PejabatModule,
    KepalaSatuanLampauModule,
    MitraModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
