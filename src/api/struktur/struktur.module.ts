import { Module } from '@nestjs/common';
import { StrukturService } from './struktur.service';
import { StrukturController } from './struktur.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: join(process.cwd(), 'public', 'struktur'),
  filename: (req, file, callback) => {
    const filename = Date.now() + '-' + file.originalname;
    callback(null, filename);
  },
});

@Module({
  controllers: [StrukturController],
  providers: [StrukturService, PrismaService],
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
})
export class StrukturModule {}
