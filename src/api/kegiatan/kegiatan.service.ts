import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';
import { UpdateKegiatanDto } from './dto/update-kegiatan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { CreateDokumentasiKegiatanDto } from './dto/create-dokumentasi-kegiatan.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class KegiatanService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File[],
    video: Express.Multer.File[],
    dokumentasi: Express.Multer.File[],
    createKegiatanDto: CreateKegiatanDto,
  ) {
    try {
      const { judul, kategori, detail, tanggal, deskripsi } = createKegiatanDto;

      // Multer has already saved the files, we just need the paths
      const videoPath = video[0].filename;
      const thumbnailPath = thumbnail[0].filename;
      const dokumentasiPath = dokumentasi.map((file) => file.filename);

      const createProgram = await this.prismaService.kegiatan.create({
        data: {
          judul,
          kategori,
          deskripsi,
          detail,
          tanggal,
          thumbnailPath,
          videoPath,
          dokumentasi: {
            createMany: {
              data: dokumentasiPath.map((path) => ({ path })),
            },
          },
        },
      });

      log(createProgram);

      return {
        success: true,
        message: 'Berhasil tambah kegiatan',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findAll(query: { kategori: string }) {
    const { kategori } = query;
    try {
      const all = await this.prismaService.kegiatan.findMany({
        where: {
          kategori,
        },
        take: 3,
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          thumbnailPath: true,
        },
      });

      return all;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findLampau(query: { kategori?: string; judul?: string }) {
    const { kategori, judul } = query;

    let whereClause: Prisma.kegiatanWhereInput;

    if (kategori === '') {
      whereClause = {
        judul: {
          contains: judul,
        },
      };
    } else {
      whereClause = {
        kategori,
        judul: {
          contains: judul,
        },
      };
    }

    try {
      const kegiatanLampau = await this.prismaService.kegiatan.findMany({
        where: whereClause,
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          kategori: true,
          thumbnailPath: true,
        },
      });

      return kegiatanLampau;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.kegiatan.count();
    const filtered = await this.prismaService.kegiatan.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.kegiatan.findMany({
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
      const kegiatan = await this.prismaService.kegiatan.findFirst({
        where: {
          id,
        },
        include: {
          dokumentasi: {
            select: {
              path: true,
            },
          },
        },
      });

      return kegiatan;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateKegiatanDto: UpdateKegiatanDto) {
    try {
      const updateProgram = await this.prismaService.kegiatan.update({
        where: {
          id,
        },
        data: updateKegiatanDto,
      });

      log(updateProgram);

      return {
        success: true,
        message: 'Berhasil edit kegiatan',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async hapusDokumentasi(hapusDokumentasiDto: {
    dokumentasiDipilih: string;
    kategori: string;
  }) {
    const { dokumentasiDipilih, kategori } = hapusDokumentasiDto;

    const parseDokumentasiDipilih = Array.isArray(dokumentasiDipilih)
      ? dokumentasiDipilih
      : JSON.parse(dokumentasiDipilih);

    const deleteDokumentasi =
      await this.prismaService.dokumentasi_kegiatan.deleteMany({
        where: { path: { in: parseDokumentasiDipilih } },
      });

    log(deleteDokumentasi);

    for (const each of parseDokumentasiDipilih) {
      const absoluteGambarPath = join(
        process.cwd(),
        'public/kegiatan',
        kategori,
        'dokumentasi',
        each,
      );
      unlinkSync(absoluteGambarPath);
    }

    return {
      success: true,
      message: 'Berhasil hapus dokumentasi',
    };
  }

  async createDokumentasi(
    id_kegiatan: number,
    gambar: Express.Multer.File,
    createDokumentasiProgramDto: { kategori: string },
  ) {
    try {
      // File is automatically saved by Multer, just save the path
      await this.prismaService.dokumentasi_kegiatan.create({
        data: {
          id_kegiatan,
          path: gambar.filename,
        },
      });

      return {
        success: true,
        message: 'Berhasil tambah dokumentasi',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateThumbnail(
    id: number,
    thumbnail: Express.Multer.File,
    body: CreateDokumentasiKegiatanDto,
  ) {
    const { kategori } = body;

    try {
      const kegiatan = await this.prismaService.kegiatan.findUniqueOrThrow({
        where: { id },
      });

      // Delete old file if exists
      if (kegiatan.thumbnailPath) {
        const oldPath = join(
          process.cwd(),
          'public/kegiatan',
          kategori,
          'thumbnail',
          kegiatan.thumbnailPath,
        );
        unlinkSync(oldPath);
      }

      // Update database with new filename (automatically saved by Multer)
      await this.prismaService.kegiatan.update({
        where: { id },
        data: { thumbnailPath: thumbnail.filename },
      });

      return {
        success: true,
        message: 'Berhasil update thumbnail',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateVideo(
    id: number,
    video: Express.Multer.File,
    body: CreateDokumentasiKegiatanDto,
  ) {
    const { kategori } = body;

    try {
      const kegiatan = await this.prismaService.kegiatan.findUniqueOrThrow({
        where: { id },
      });

      // Delete old file if exists
      if (kegiatan.videoPath) {
        const oldPath = join(
          process.cwd(),
          'public/kegiatan',
          kategori,
          'video',
          kegiatan.videoPath,
        );
        unlinkSync(oldPath);
      }

      // Update database with new filename
      await this.prismaService.kegiatan.update({
        where: { id },
        data: { videoPath: video.filename },
      });

      return {
        success: true,
        message: 'Berhasil update video',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    const kegiatan = await this.prismaService.kegiatan.findUnique({
      where: {
        id,
      },
      include: {
        dokumentasi: {
          select: {
            path: true,
          },
        },
      },
    });

    const thumbnailPath = join(
      process.cwd(),
      'public/kegiatan',
      kegiatan.kategori,
      'thumbnail',
      kegiatan.thumbnailPath,
    );
    unlinkSync(thumbnailPath);

    for (const dokumentasi of kegiatan.dokumentasi) {
      const { path } = dokumentasi;
      const dokumentasiPath = join(
        process.cwd(),
        'public/kegiatan',
        kegiatan.kategori,
        'dokumentasi',
        path,
      );
      unlinkSync(dokumentasiPath);
    }

    const deleteKegiatan = await this.prismaService.kegiatan.delete({
      where: {
        id,
      },
    });

    log(deleteKegiatan);

    return {
      success: true,
      message: 'Berhasil menghapus kegiatan',
    };
  }
}
