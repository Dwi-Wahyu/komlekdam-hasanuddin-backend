import {
  Injectable,
  InternalServerErrorException,
  UploadedFile,
} from '@nestjs/common';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GaleriService {
  constructor(private readonly prismaService: PrismaService) {}

  async postGambar(gambar: Express.Multer.File) {
    const { filename } = gambar;

    await this.prismaService.galeri.create({
      data: {
        path: filename,
      },
    });

    return 'Berhasil post gambar ke galeri';
  }

  async getAllGambar() {
    const allGambar = await this.prismaService.galeri.findMany({
      where: {
        tampilkan: true,
      },
    });

    return allGambar;
  }

  async getGambar(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.galeri.count();
    const filtered = await this.prismaService.galeri.count({
      where: {
        path: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.galeri.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        path: {
          contains: search,
        },
      },
    });

    let totalPages = Math.ceil(filtered / parseInt(per_page));

    return {
      data: {
        data: paged,
        totalDatas,
        totalPages,
        currentPage: parseInt(page),
      },
    };
  }

  async toggleTampilkan(id: string) {
    try {
      const foto = await this.prismaService.galeri.findFirst({
        where: {
          id,
        },
      });

      if (foto) {
        const updateFoto = await this.prismaService.galeri.update({
          where: {
            id,
          },
          data: {
            tampilkan: !foto.tampilkan,
          },
        });

        log(updateFoto);
      }

      return 'Berhasil toggle tampilkan';
    } catch (error) {
      log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const deleteData = await this.prismaService.galeri.delete({
        where: {
          id,
        },
      });

      log(deleteData);

      return 'Berhasil delete data';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
