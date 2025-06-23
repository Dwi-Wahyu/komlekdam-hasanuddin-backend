import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

export const CeritaInspiratifStorage = FileFieldsInterceptor(
  [
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ],
  {
    storage: diskStorage({
      destination: (req, file, cb) => {
        let subfolder: string;

        if (file.fieldname === 'thumbnail') {
          subfolder = 'thumbnail';
        } else if (file.fieldname === 'video') {
          subfolder = 'video';
        }

        const fullPath = join(
          process.cwd(),
          'public',
          'cerita-inspiratif',
          subfolder,
        );
        cb(null, fullPath);
      },
      filename: (req, file, cb) => {
        const uniqueName =
          Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, uniqueName);
      },
    }),
  },
);
