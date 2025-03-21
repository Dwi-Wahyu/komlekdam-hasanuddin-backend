import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMitraDto } from './dto/create-mitra.dto';
import { UpdateMitraDto } from './dto/update-mitra.dto';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { writeFileSync } from 'fs';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class MitraService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(logo: Express.Multer.File, createMitraDto: CreateMitraDto) {
    const { originalname, buffer } = logo;
    const { nama } = createMitraDto;

    const absolutePasfotoPath = join(
      process.cwd(),
      'public/profil/mitra/logo',
      originalname,
    );

    writeFileSync(absolutePasfotoPath, buffer);

    try {
      const createMitra = await this.prismaService.mitra.create({
        data: {
          nama,
          logoPath: originalname,
        },
      });

      log(createMitra);

      return {
        success: true,
        message: 'Berhasil tambah data mitra',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.mitra.count();
    const filtered = await this.prismaService.mitra.count({
      where: {
        nama: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.mitra.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        nama: {
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

  findAll() {
    return `This action returns all mitra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mitra`;
  }

  update(id: number, updateMitraDto: UpdateMitraDto) {
    return `This action updates a #${id} mitra`;
  }

  remove(id: number) {
    return `This action removes a #${id} mitra`;
  }
}
