import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PenggunaModule } from './api/pengguna/pengguna.module';
import { ArtikelModule } from './api/artikel/artikel.module';
import { GaleriModule } from './api/galeri/galeri.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { KataSambutanModule } from './api/kata-sambutan/kata-sambutan.module';
import { ProgramAcaraModule } from './api/program-acara/program-acara.module';
import { StrukturModule } from './api/struktur/struktur.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StatistikModule } from './api/statistik/statistik.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    PrismaModule,
    PenggunaModule,
    ArtikelModule,
    GaleriModule,
    AuthModule,
    KataSambutanModule,
    ProgramAcaraModule,
    StrukturModule,
    StatistikModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}
