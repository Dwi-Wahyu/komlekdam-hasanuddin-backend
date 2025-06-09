import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Query,
  UploadedFile,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { LitbangService } from './litbang.service';
import { CreateLitbangDto } from './dto/create-litbang.dto';
import { UpdateLitbangDto } from './dto/update-litbang.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { LitbangValidationPipe } from './litbang.validation.pipe';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { DokumentasiValidationPipe } from '../mitra/dokumentasi.validation.pipe';
import { UpdateLitbangValidationPipe } from './update.litbang.validation.pipe';
import { Public } from 'src/auth/PublicDecorator';
import { ThumbnailValidationPipe } from '../berita/thumbnail.validation.pipe';
import { VideoValidationPipe } from '../kegiatan/video.validation.pipe';
import { diskStorage } from 'multer';

@Controller('api/litbang')
export class LitbangController {
  constructor(private readonly litbangService: LitbangService) {}

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
            let uploadPath: string;

            // Tentukan folder tujuan berdasarkan jenis file
            if (file.fieldname === 'thumbnail') {
              uploadPath = './public/litbang/thumbnail';
            } else if (file.fieldname === 'video') {
              uploadPath = './public/litbang/video';
            } else if (file.fieldname === 'dokumentasi') {
              uploadPath = './public/litbang/dokumentasi';
            } else {
              uploadPath = './public/uploads'; // Fallback
            }

            cb(null, uploadPath);
          },
          filename: (req, file, cb) => {
            // Generate nama file unik (timestamp + nama asli)
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
          },
        }),
      },
    ),
  )
  create(
    @UploadedFiles(new LitbangValidationPipe())
    files: {
      video: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
      dokumentasi: Express.Multer.File[];
    },
    @Body() createLitbangDto: CreateLitbangDto,
  ) {
    return this.litbangService.create(
      files.thumbnail,
      files.video,
      files.dokumentasi,
      createLitbangDto,
    );
  }

  @Patch('hapus-dokumentasi')
  hapusDokumentasi(
    @Body()
    hapusDokumentasiDto: {
      dokumentasiDipilih: string;
    },
  ) {
    return this.litbangService.hapusDokumentasi(hapusDokumentasiDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLitbangDto: UpdateLitbangDto) {
    return this.litbangService.update(+id, updateLitbangDto);
  }

  @Post('ganti-thumbnail/:id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './public/litbang/thumbnail', // Folder untuk thumbnail
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName); // Format: timestamp-nama-file
        },
      }),
    }),
  )
  updateThumbnail(
    @UploadedFile(new ThumbnailValidationPipe()) thumbnail: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.updateThumbnail(+id, thumbnail);
  }

  @Post('ganti-video/:id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './public/litbang/video', // Folder untuk video
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName); // Format: timestamp-nama-file
        },
      }),
    }),
  )
  updateVideo(
    @UploadedFile(new VideoValidationPipe()) video: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.updateVideo(+id, video);
  }

  @Post('dokumentasi/:id')
  @UseInterceptors(
    FileInterceptor('gambar', {
      storage: diskStorage({
        destination: './public/litbang/dokumentasi', // Folder penyimpanan
        filename: (req, file, cb) => {
          // Generate nama file unik: timestamp + nama asli
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  createDokumentasi(
    @UploadedFile(new DokumentasiValidationPipe()) gambar: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.litbangService.createDokumentasi(+id, gambar);
  }

  @Public()
  @Get('lampau')
  findLampau(@Query() query: { judul?: string }) {
    return this.litbangService.findLampau(query);
  }

  @Get('data')
  findData(@Query() query: DatatableQuery) {
    return this.litbangService.findData(query);
  }

  @Public()
  @Get()
  findAll() {
    return this.litbangService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.litbangService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.litbangService.remove(+id);
  }
}
