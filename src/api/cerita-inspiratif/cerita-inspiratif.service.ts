import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCeritaInspiratifDto } from './dto/create-cerita-inspiratif.dto';
import { UpdateCeritaInspiratifDto } from './dto/update-cerita-inspiratif.dto';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class CeritaInspiratifService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File,
    video: Express.Multer.File,
    createCeritaInspiratifDto: CreateCeritaInspiratifDto,
  ) {
    try {
      const { judul, deskripsi } = createCeritaInspiratifDto;

      const thumbnailPath = thumbnail.filename;
      const videoPath = video.filename;

      const createCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.create({
          data: {
            judul,
            deskripsi,
            thumbnailPath,
            videoPath,
          },
        });

      log(createCeritaInspiratif);

      return {
        success: true,
        message: 'Berhasil tambah cerita inspiratif',
      };
    } catch (error) {
      log(error);
      throw new InternalServerErrorException(
        'Gagal menyimpan cerita inspiratif',
      );
    }
  }

  async findAll() {
    try {
      const allCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.findMany();
      return allCeritaInspiratif;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.cerita_inspiratif.count();
    const filtered = await this.prismaService.cerita_inspiratif.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.cerita_inspiratif.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        judul: {
          contains: search,
        },
      },
    });

    let totalPages = Math.ceil(filtered / parseInt(per_page));

    return {
      data: paged,
      totalDatas,
      totalPages,
      currentPage: parseInt(page),
    };
  }

  async findOne(id: number) {
    try {
      const ceritaInspiratif =
        await this.prismaService.cerita_inspiratif.findUnique({
          where: {
            id,
          },
        });

      return ceritaInspiratif;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateThumbnail(id: number, thumbnail: Express.Multer.File) {
    const { originalname, buffer } = thumbnail;

    try {
      const ceritaInspiratif =
        await this.prismaService.cerita_inspiratif.findFirst({
          where: { id },
        });

      const thumbnailPath = Date.now() + '-' + originalname;

      const fileToDelete = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/thumbnail',
        ceritaInspiratif.thumbnailPath,
      );
      const fileToWrite = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/thumbnail',
        thumbnailPath,
      );

      unlinkSync(fileToDelete);
      writeFileSync(fileToWrite, buffer);

      const updateThumbnailCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.update({
          where: {
            id,
          },
          data: {
            thumbnailPath,
          },
        });

      log(updateThumbnailCeritaInspiratif);

      return {
        success: true,
        message: 'Berhasil update thumbnail',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateVideo(id: number, video: Express.Multer.File) {
    const { originalname, buffer } = video;

    try {
      const ceritaInspiratif =
        await this.prismaService.cerita_inspiratif.findFirst({
          where: { id },
        });

      const videoPath = Date.now() + '-' + originalname;

      const fileToDelete = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/video',
        ceritaInspiratif.videoPath,
      );
      const fileToWrite = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/video',
        videoPath,
      );

      unlinkSync(fileToDelete);
      writeFileSync(fileToWrite, buffer);

      const updateVideoCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.update({
          where: {
            id,
          },
          data: {
            videoPath,
          },
        });

      log(updateVideoCeritaInspiratif);

      return {
        success: true,
        message: 'Berhasil update video',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateCeritaInspiratifDto: UpdateCeritaInspiratifDto,
  ) {
    try {
      const updateCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.update({
          where: { id },
          data: updateCeritaInspiratifDto,
        });

      log(updateCeritaInspiratif);

      return {
        success: true,
        message: 'Berhasil update cerita inspiratif',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const ceritaInspiratif =
        await this.prismaService.cerita_inspiratif.findUnique({
          where: {
            id,
          },
        });

      const thumbnailAbsolutePath = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/thumbnail',
        ceritaInspiratif.thumbnailPath,
      );
      const videoAbsolutePath = join(
        process.cwd(),
        'public',
        'cerita-inspiratif/video',
        ceritaInspiratif.videoPath,
      );

      unlinkSync(thumbnailAbsolutePath);
      unlinkSync(videoAbsolutePath);

      const removeCeritaInspiratif =
        await this.prismaService.cerita_inspiratif.delete({ where: { id } });

      log(removeCeritaInspiratif);

      return {
        success: true,
        message: 'Berhasil hapus cerita inspiratif',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }
}
