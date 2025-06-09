import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLitbangDto } from './dto/create-litbang.dto';
import { UpdateLitbangDto } from './dto/update-litbang.dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class LitbangService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File[],
    video: Express.Multer.File[],
    dokumentasi: Express.Multer.File[],
    createLitbangDto: CreateLitbangDto,
  ) {
    try {
      const { judul, deskripsi, detail, tanggal, penulis } = createLitbangDto;

      const thumbnailPath = thumbnail[0].filename;
      const videoPath = video[0].filename;
      const dokumentasiPath = dokumentasi.map((file) => file.filename);

      const createLitbang = await this.prismaService.litbang.create({
        data: {
          judul,
          deskripsi,
          detail,
          tanggal,
          penulis,
          thumbnailPath,
          videoPath,
          dokumentasi: {
            createMany: {
              data: dokumentasiPath.map((path) => ({ path })),
            },
          },
        },
      });

      log(createLitbang);

      return {
        success: true,
        message: 'Berhasil input penelitian',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.litbang.count();
    const filtered = await this.prismaService.litbang.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.litbang.findMany({
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

  async findAll() {
    try {
      const allLitbang = await this.prismaService.litbang.findMany({
        take: 4,
      });

      return allLitbang;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findLampau(query: { judul?: string }) {
    const { judul } = query;

    try {
      const penelitianLampau = await this.prismaService.litbang.findMany({
        where: {
          judul: {
            contains: judul,
          },
        },
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          thumbnailPath: true,
        },
      });

      return penelitianLampau;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const litbang = await this.prismaService.litbang.findUnique({
        where: {
          id,
        },
        include: {
          dokumentasi: {
            select: {
              id: true,
              path: true,
            },
          },
        },
      });
      return litbang;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateLitbangDto: UpdateLitbangDto) {
    try {
      const { deskripsi, detail, judul, penulis, tanggal } = updateLitbangDto;

      const updatedLitbang = await this.prismaService.litbang.update({
        where: {
          id,
        },
        data: {
          deskripsi,
          judul,
          tanggal,
          detail,
          penulis,
        },
      });

      log(updatedLitbang);

      return {
        success: true,
        message: 'Berhasil update penelitian',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateThumbnail(id: number, thumbnail: Express.Multer.File) {
    try {
      const litbang = await this.prismaService.litbang.findFirst({
        where: { id },
      });

      // Hapus file lama jika ada
      if (litbang.thumbnailPath) {
        const oldFilePath = join(
          process.cwd(),
          'public/litbang/thumbnail',
          litbang.thumbnailPath,
        );
        unlinkSync(oldFilePath); // Hapus file lama
      }

      // Update path file baru di database (thumbnail.filename sudah di-generate oleh Multer)
      await this.prismaService.litbang.update({
        where: { id },
        data: {
          thumbnailPath: thumbnail.filename, // Gunakan nama file yang sudah disimpan
        },
      });

      return {
        success: true,
        message: 'Berhasil update thumbnail',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updateVideo(id: number, video: Express.Multer.File) {
    try {
      const litbang = await this.prismaService.litbang.findFirst({
        where: { id },
      });

      // Hapus file lama jika ada
      if (litbang.videoPath) {
        const oldFilePath = join(
          process.cwd(),
          'public/litbang/video',
          litbang.videoPath,
        );
        unlinkSync(oldFilePath); // Hapus file lama
      }

      // Update path file baru di database
      await this.prismaService.litbang.update({
        where: { id },
        data: {
          videoPath: video.filename, // Gunakan nama file yang sudah disimpan
        },
      });

      return {
        success: true,
        message: 'Berhasil update video',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async createDokumentasi(id_litbang: number, gambar: Express.Multer.File) {
    try {
      const createDokumentasiProgram =
        await this.prismaService.dokumentasi_litbang.create({
          data: {
            id_litbang,
            path: gambar.filename, // Gunakan nama file yang sudah disimpan
          },
        });

      log(createDokumentasiProgram);

      return {
        success: true,
        message: 'Berhasil tambah dokumentasi',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async hapusDokumentasi(hapusDokumentasiDto: { dokumentasiDipilih: string }) {
    const { dokumentasiDipilih } = hapusDokumentasiDto;

    const parseDokumentasiDipilih = Array.isArray(dokumentasiDipilih)
      ? dokumentasiDipilih
      : JSON.parse(dokumentasiDipilih);

    log(parseDokumentasiDipilih);

    const deleteDokumentasi =
      await this.prismaService.dokumentasi_litbang.deleteMany({
        where: { path: { in: parseDokumentasiDipilih } },
      });

    log(deleteDokumentasi);

    for (const each of parseDokumentasiDipilih) {
      const absoluteGambarPath = join(
        process.cwd(),
        'public/litbang/dokumentasi',
        each,
      );
      unlinkSync(absoluteGambarPath);
    }

    return {
      success: true,
      message: 'Berhasil hapus dokumentasi',
    };
  }

  async remove(id: number) {
    try {
      const deleteLitbang = await this.prismaService.litbang.delete({
        where: {
          id,
        },
        include: {
          dokumentasi: true,
        },
      });

      log(deleteLitbang);

      const thumbnailToDelete = join(
        process.cwd(),
        'public/litbang/thumbnail',
        deleteLitbang.thumbnailPath,
      );

      const videoToDelete = join(
        process.cwd(),
        'public/litbang/video',
        deleteLitbang.videoPath,
      );

      unlinkSync(thumbnailToDelete);
      unlinkSync(videoToDelete);

      for (const each of deleteLitbang.dokumentasi) {
        const dokumentasiToDelete = join(
          process.cwd(),
          'public/litbang/dokumentasi',
          each.path,
        );
        unlinkSync(dokumentasiToDelete);
      }

      const deleteDokumentasi =
        await this.prismaService.dokumentasi_litbang.deleteMany({
          where: {
            id_litbang: id,
          },
        });

      log(deleteDokumentasi);

      return {
        success: true,
        message: 'Berhasil hapus penelitian',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }
}
