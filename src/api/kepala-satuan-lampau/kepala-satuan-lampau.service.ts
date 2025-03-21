import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateKepalaSatuanLampauDto } from './dto/create-kepala-satuan-lampau.dto';
import { UpdateKepalaSatuanLampauDto } from './dto/update-kepala-satuan-lampau.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class KepalaSatuanLampauService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    pasfoto: Express.Multer.File,
    createKepalaSatuanLampauDto: CreateKepalaSatuanLampauDto,
  ) {
    const { originalname, buffer } = pasfoto;
    const { jabatan, nama, periode } = createKepalaSatuanLampauDto;

    const absolutePasfotoPath = join(
      process.cwd(),
      'public/profil/kakomlekdam_lampau',
      originalname,
    );

    writeFileSync(absolutePasfotoPath, buffer);

    try {
      const createKakomlekdamLampau =
        await this.prismaService.kakomlekdam_lampau.create({
          data: {
            nama,
            jabatan,
            periode,
            pasfoto: originalname,
          },
        });

      log(createKakomlekdamLampau);

      return {
        success: true,
        message: 'Berhasil tambah data kepala satuan lampau',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.pejabat_satuan.count();
    const filtered = await this.prismaService.pejabat_satuan.count({
      where: {
        nama: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.pejabat_satuan.findMany({
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
    return `This action returns all kepalaSatuanLampau`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kepalaSatuanLampau`;
  }

  update(id: number, updateKepalaSatuanLampauDto: UpdateKepalaSatuanLampauDto) {
    return `This action updates a #${id} kepalaSatuanLampau`;
  }

  remove(id: number) {
    return `This action removes a #${id} kepalaSatuanLampau`;
  }
}
