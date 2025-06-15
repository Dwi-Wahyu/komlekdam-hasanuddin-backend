import { Module } from '@nestjs/common';
import { StandarLayananService } from './standar-layanan.service';
import { StandarLayananController } from './standar-layanan.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/standar-layanan',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = [
          // Image types
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/svg+xml',
          // Video types
          'video/mp4',
          'video/webm',
          'video/ogg',
          'video/quicktime',
          'video/x-msvideo',
          'video/x-ms-wmv',
          'video/x-matroska',
        ];

        const allowedExtensions = [
          // Image extensions
          '.jpg',
          '.jpeg',
          '.png',
          '.gif',
          '.webp',
          '.svg',
          // Video extensions
          '.mp4',
          '.webm',
          '.ogg',
          '.mov',
          '.avi',
          '.wmv',
          '.mkv',
        ];

        // Check MIME type
        const isValidMimeType = allowedMimeTypes.includes(file.mimetype);

        // Check file extension
        const ext = extname(file.originalname).toLowerCase();
        const isValidExtension = allowedExtensions.includes(ext);

        if (isValidMimeType && isValidExtension) {
          callback(null, true);
        } else {
          callback(
            new Error(
              'Hanya file gambar (JPEG, PNG, GIF, WEBP, SVG) dan video (MP4, WEBM, OGG, MOV, AVI, WMV, MKV) yang diizinkan',
            ),
            false,
          );
        }
      },
    }),
  ],
  controllers: [StandarLayananController],
  providers: [StandarLayananService, PrismaService],
})
export class StandarLayananModule {}
