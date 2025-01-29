import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateKomentarDto } from './dto/create-komentar.dto';
import { UpdateKomentarDto } from './dto/update-komentar.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class KomentarService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createKomentarDto: CreateKomentarDto) {
    try {
      const createProgramAcara = await this.prismaService.komentar.create({
        data: createKomentarDto,
      });

      log(createProgramAcara);

      return 'Berhasil post komentar';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const allKomentar = await this.prismaService.komentar.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        subkomentar: true,
      },
    });

    return allKomentar;
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.komentar.count();
    const filtered = await this.prismaService.komentar.count({
      where: {
        nama: {
          contains: search,
        },
        isi: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.komentar.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        nama: {
          contains: search,
        },
        isi: {
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

  async update(id: string, updateKomentarDto: UpdateKomentarDto) {
    try {
      const updateKomentar = await this.prismaService.komentar.update({
        where: {
          id,
        },
        data: updateKomentarDto,
      });

      log(updateKomentar);

      return `Berhasil update ${id} komentar`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const hapusSubKomentar = await this.prismaService.subkomentar.deleteMany({
        where: {
          id_komentar: id,
        },
      });

      const hapusKomentar = await this.prismaService.komentar.delete({
        where: {
          id,
        },
      });

      log(hapusKomentar);
      log(hapusSubKomentar);

      return `Berhasil menghapus ${id} komentar`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
