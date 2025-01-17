import { Module } from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { GaleriController } from './galeri.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

const storage = diskStorage({
  destination: join(process.cwd(), 'public', 'galeri'),
  filename: (req, file, callback) => {
    const filename = Date.now() + '-' + file.originalname;
    callback(null, filename);
  },
});

@Module({
  controllers: [GaleriController],
  providers: [GaleriService, PrismaService],
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
})
export class GaleriModule {}
