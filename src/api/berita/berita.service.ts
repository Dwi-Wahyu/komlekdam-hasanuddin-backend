import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBeritaDto } from './dto/create-berita.dto';
import { UpdateBeritaDto } from './dto/update-berita.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import * as moment from 'moment';
import { CreateBalasanKomentarDto } from './dto/create-balasan-komentar.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BeritaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File,
    createBeritaDto: CreateBeritaDto,
  ) {
    try {
      const { originalname, buffer } = thumbnail;
      const {
        judul,
        penulis,
        lokasi,
        kategori,
        deskripsi,
        tanggal,
        detail,
        publisher_id,
      } = createBeritaDto;

      const thumbnailRelativePath = Date.now() + '-' + originalname;
      const thumbnailAbsolutePath = join(
        process.cwd(),
        'public/berita/thumbnail',
        thumbnailRelativePath,
      );

      const dipublish_oleh_id = parseInt(publisher_id);

      writeFileSync(thumbnailAbsolutePath, buffer);

      const createBerita = await this.prismaService.berita.create({
        data: {
          judul,
          penulis,
          lokasi,
          deskripsi,
          tanggal,
          detail,
          kategori,
          dipublish_oleh_id,
          thumbnailPath: thumbnailRelativePath,
        },
      });

      log(createBerita);

      return {
        success: true,
        message: 'Berhasil publish berita',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findAllKomentarInBerita(id_berita: number) {
    try {
      const komentar = await this.prismaService.komentar.findMany({
        where: {
          id_berita,
        },
        include: {
          balasan_komentar: true,
        },
      });

      return komentar;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async createKomentar(createKomentarDto: CreateKomentarDto) {
    try {
      const { isi, nama, id, id_user } = createKomentarDto;

      const tanggal = moment().format('YYYY-MM-DD');

      const user = await this.prismaService.user.findUnique({
        where: {
          id: id_user,
        },
      });

      let komentar_sebagai = 'Umum';

      if (user) {
        komentar_sebagai = user.role;
      }

      const createQuery = await this.prismaService.komentar.create({
        data: {
          id_berita: id,
          komentar_sebagai,
          nama,
          tanggal,
          isi,
        },
      });

      log(createQuery);

      return {
        success: true,
        message: 'Berhasil menambahkan komentar',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async createBalasanKomentar(
    createBalasanKomentarDto: CreateBalasanKomentarDto,
  ) {
    try {
      const { isi, nama, id_komentar, id_berita, kepada, id_user } =
        createBalasanKomentarDto;

      const tanggal = moment().format('YYYY-MM-DD');

      const user = await this.prismaService.user.findUnique({
        where: {
          id: id_user,
        },
      });

      let komentar_sebagai = 'Umum';

      if (user) {
        komentar_sebagai = user.role;
      }

      const createQuery = await this.prismaService.balasan_komentar.create({
        data: {
          id_komentar,
          id_berita,
          nama,
          komentar_sebagai,
          kepada,
          tanggal,
          isi,
        },
      });

      log(createQuery);

      return {
        success: true,
        message: 'Berhasil balas komentar',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findAllByKategori(
    kategori: string,
    query: { page: string; limit: string },
  ) {
    const { page, limit } = query;

    const pageNumber = parseInt(page) || 0;
    const limitNumber = parseInt(limit) || 3;

    try {
      const allBerita = await this.prismaService.berita.findMany({
        where: {
          kategori,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: pageNumber * limitNumber,
        take: parseInt(limit),
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          thumbnailPath: true,
        },
      });

      const totalBerita = await this.prismaService.berita.count({
        where: {
          kategori,
        },
      });

      return { allBerita, totalBerita };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findPopuler(query: { excludeId: string }) {
    const { excludeId } = query;

    try {
      const allBerita = await this.prismaService.berita.findMany({
        where: {
          id: {
            not: parseInt(excludeId),
          },
        },
        orderBy: {
          like: 'desc',
        },
        take: 3,
        select: {
          id: true,
          judul: true,
          deskripsi: true,
          thumbnailPath: true,
        },
      });

      return allBerita;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search, id_user } = query;
    const id = parseInt(id_user);

    let whereClause: Prisma.beritaWhereInput = {
      judul: {
        contains: search,
      },
    };

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (user.role === 'Journalis') {
      whereClause = {
        ...whereClause,
        dipublish_oleh_id: user.id,
      };
    }

    const totalDatas = await this.prismaService.berita.count();
    const filtered = await this.prismaService.berita.count({
      where: whereClause,
    });
    const paged = await this.prismaService.berita.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: whereClause,
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
      const berita = await this.prismaService.$transaction(async (prisma) => {
        const existingBerita = await prisma.berita.findUnique({
          where: { id },
        });

        if (!existingBerita) {
          throw new NotFoundException(`Berita dengan ID ${id} tidak ditemukan`);
        }

        return prisma.berita.update({
          where: { id },
          data: {
            jumlahPengunjung: {
              increment: 1,
            },
          },
        });
      });

      return berita;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Gagal memproses permintaan');
    }
  }

  async handleLike(id: number, konten: string) {
    try {
      switch (konten) {
        case 'komentar':
          const addLikeKomentar = await this.prismaService.komentar.update({
            where: {
              id,
            },
            data: {
              like: {
                increment: 1,
              },
            },
          });

          log(addLikeKomentar);
          break;
        case 'balasan_komentar':
          const addLikeBalasanKomentar =
            await this.prismaService.balasan_komentar.update({
              where: {
                id,
              },
              data: {
                like: {
                  increment: 1,
                },
              },
            });

          log(addLikeBalasanKomentar);
          break;
        case 'main':
          const addLikeBerita = await this.prismaService.berita.update({
            where: {
              id,
            },
            data: {
              like: {
                increment: 1,
              },
            },
          });

          log(addLikeBerita);
          break;
        default:
          return new BadRequestException('Konten tidak valid');
      }

      return {
        success: true,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async handleDislike(id: number, konten: string) {
    try {
      switch (konten) {
        case 'komentar':
          const addLikeKomentar = await this.prismaService.komentar.update({
            where: {
              id,
            },
            data: {
              dislike: {
                increment: 1,
              },
            },
          });

          log(addLikeKomentar);
          break;
        case 'balasan_komentar':
          const addLikeBalasanKomentar =
            await this.prismaService.balasan_komentar.update({
              where: {
                id,
              },
              data: {
                dislike: {
                  increment: 1,
                },
              },
            });

          log(addLikeBalasanKomentar);
          break;
        case 'main':
          const addLikeBerita = await this.prismaService.berita.update({
            where: {
              id,
            },
            data: {
              dislike: {
                increment: 1,
              },
            },
          });

          log(addLikeBerita);
          break;
        default:
          return new BadRequestException('Konten tidak valid');
      }

      return {
        success: true,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateBeritaDto: UpdateBeritaDto,
    thumbnail: Express.Multer.File,
  ) {
    try {
      const {
        judul,
        deskripsi,
        detail,
        kategori,
        lokasi,
        updated_by_username,
        penulis,
        tanggal,
      } = updateBeritaDto;

      const berita = await this.prismaService.berita.findUnique({
        where: {
          id,
        },
      });

      const fileToDelete = join(
        process.cwd(),
        'public',
        'berita/thumbnail',
        berita.thumbnailPath,
      );

      unlinkSync(fileToDelete);

      const fileToWrite = join(
        process.cwd(),
        'public',
        'berita/thumbnail',
        thumbnail.originalname,
      );

      writeFileSync(fileToWrite, thumbnail.buffer);

      const updateBerita = await this.prismaService.berita.update({
        where: {
          id,
        },
        data: {
          judul,
          deskripsi,
          detail,
          kategori,
          lokasi,
          tanggal,
          last_updated_by_username: updated_by_username,
          penulis,
          thumbnailPath: thumbnail.originalname,
        },
      });

      log(updateBerita);

      return {
        success: true,
        message: 'Berhasil update berita',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const deleteKomentar = await this.prismaService.komentar.deleteMany({
        where: {
          id_berita: id,
        },
      });

      const deleteBalasanKomentar =
        await this.prismaService.balasan_komentar.deleteMany({
          where: {
            id_berita: id,
          },
        });

      const deleteBerita = await this.prismaService.berita.delete({
        where: {
          id,
        },
      });

      const fileToDelete = join(
        process.cwd(),
        'public',
        'berita/thumbnail',
        deleteBerita.thumbnailPath,
      );

      unlinkSync(fileToDelete);

      return {
        success: true,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async tambahkanDibagikan(id: number) {
    const updateBerita = await this.prismaService.berita.update({
      where: {
        id,
      },
      data: {
        jumlahDibagikan: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
    };
  }
}
