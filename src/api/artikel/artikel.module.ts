import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';

const storage = diskStorage({
  destination: join(process.cwd(), 'public', 'artikel', 'thumbnail'),
  filename: (req, file, callback) => {
    const filename = Date.now() + '-' + file.originalname;
    callback(null, filename);
  },
});

@Module({
  controllers: [ArtikelController],
  providers: [ArtikelService, PrismaService],
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
})
export class ArtikelModule {}
