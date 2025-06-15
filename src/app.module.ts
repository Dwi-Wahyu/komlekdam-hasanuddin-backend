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
import { PejabatModule } from './api/pejabat/pejabat.module';
import { KepalaSatuanLampauModule } from './api/kepala-satuan-lampau/kepala-satuan-lampau.module';
import { MitraModule } from './api/mitra/mitra.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { LitbangModule } from './api/litbang/litbang.module';
import { LiveYoutubeModule } from './api/live-youtube/live-youtube.module';
import { CeritaInspiratifModule } from './api/cerita-inspiratif/cerita-inspiratif.module';
import { JadwalLaguModule } from './api/jadwal-lagu/jadwal-lagu.module';
import { KegiatanModule } from './api/kegiatan/kegiatan.module';
import { StatistikModule } from './api/statistik/statistik.module';
import { StandarLayananModule } from './api/standar-layanan/standar-layanan.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BeritaModule,
    LaporanModule,
    KegiatanModule,
    LitbangModule,
    PejabatModule,
    KepalaSatuanLampauModule,
    MitraModule,
    CeritaInspiratifModule,
    JadwalLaguModule,
    LiveYoutubeModule,
    StatistikModule,
    StandarLayananModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
