import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { KegiatanService } from './kegiatan.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';
import { UpdateKegiatanDto } from './dto/update-kegiatan.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { KegiatanValidationPipe } from './kegiatan.validation.pipe';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { CreateDokumentasiKegiatanDto } from './dto/create-dokumentasi-kegiatan.dto';
import { VideoValidationPipe } from './video.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Public } from 'src/auth/PublicDecorator';
import { DokumentasiValidationPipe } from '../mitra/dokumentasi.validation.pipe';
import { join } from 'path';
import { diskStorage } from 'multer';

@Controller('api/kegiatan')
export class KegiatanController {
  constructor(private readonly kegiatanService: KegiatanService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'dokumentasi', maxCount: 5 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            const { kategori } = req.body;
            let subfolder: string;

            if (file.fieldname === 'thumbnail') {
              subfolder = 'thumbnail';
            } else if (file.fieldname === 'video') {
              subfolder = 'video';
            } else {
              subfolder = 'dokumentasi';
            }

            const fullPath = join('public/kegiatan', kategori, subfolder);
            cb(null, fullPath);
          },
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
          },
        }),
      },
    ),
  )
  create(
    @UploadedFiles(new KegiatanValidationPipe())
    files: {
      thumbnail: Express.Multer.File[];
      video: Express.Multer.File[];
      dokumentasi: Express.Multer.File[];
    },
    @Body() createKegiatanDto: CreateKegiatanDto,
  ) {
    return this.kegiatanService.create(
      files.thumbnail,
      files.video,
      files.dokumentasi,
      createKegiatanDto,
    );
  }

  @Patch('hapus-dokumentasi')
  hapusDokumentasi(
    @Body()
    hapusDokumentasiDto: {
      dokumentasiDipilih: string;
      kategori: string;
    },
  ) {
    return this.kegiatanService.hapusDokumentasi(hapusDokumentasiDto);
  }

  @Post('ganti-thumbnail/program/:id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join('public/kegiatan', 'program', 'thumbnail');
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  updateThumbnailProgram(
    @Body() body: CreateDokumentasiKegiatanDto,
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.kegiatanService.updateThumbnail(+id, thumbnail, {
      ...body,
      kategori: 'program',
    });
  }

  @Post('ganti-thumbnail/non-program/:id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join('public/kegiatan', 'non-program', 'thumbnail');
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  updateThumbnailNonProgram(
    @Body() body: CreateDokumentasiKegiatanDto,
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.kegiatanService.updateThumbnail(+id, thumbnail, {
      ...body,
      kategori: 'non-program',
    });
  }

  @Post('ganti-video/program/:id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join('public/kegiatan', 'program', 'video');
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  updateVideoProgram(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.updateVideo(+id, video, {
      ...body,
      kategori: 'program',
    });
  }

  @Post('ganti-video/non-program/:id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join('public/kegiatan', 'non-program', 'video');
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  updateVideoNonProgram(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
    @Body() body: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.updateVideo(+id, video, {
      ...body,
      kategori: 'non-program',
    });
  }

  @Post('dokumentasi/program/:id')
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join('public/kegiatan', 'program', 'dokumentasi');
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  createDokumentasiProgram(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Param('id') id: string,
    @Body() createDokumentasiKegiatanDto: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.createDokumentasi(+id, gambar, {
      ...createDokumentasiKegiatanDto,
      kategori: 'program',
    });
  }

  @Post('dokumentasi/non-program/:id')
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fullPath = join(
            'public/kegiatan',
            'non-program',
            'dokumentasi',
          );
          cb(null, fullPath);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  createDokumentasiNonProgram(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Param('id') id: string,
    @Body() createDokumentasiKegiatanDto: CreateDokumentasiKegiatanDto,
  ) {
    return this.kegiatanService.createDokumentasi(+id, gambar, {
      ...createDokumentasiKegiatanDto,
      kategori: 'non-program',
    });
  }

  @Public()
  @Get()
  findAll(@Query() query: { kategori: string }) {
    return this.kegiatanService.findAll(query);
  }

  @Public()
  @Get('lampau')
  findLampau(@Query() query: { kategori?: string; judul?: string }) {
    return this.kegiatanService.findLampau(query);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.kegiatanService.findData(query);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateKegiatanDto: UpdateKegiatanDto,
  ) {
    return this.kegiatanService.update(+id, updateKegiatanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kegiatanService.remove(+id);
  }
}
