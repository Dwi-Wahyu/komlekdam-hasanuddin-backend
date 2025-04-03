import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateKepalaSatuanLampauDto } from './dto/create-kepala-satuan-lampau.dto';
import { UpdateKepalaSatuanLampauDto } from './dto/update-kepala-satuan-lampau.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class KepalaSatuanLampauService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(foto: Express.Multer.File) {
    const { originalname, buffer } = foto;

    const relativeFotoPath = Date.now() + '-' + originalname;
    const absoluteFotoPath = join(
      process.cwd(),
      'public/profil/kakomlekdam_lampau',
      relativeFotoPath,
    );

    writeFileSync(absoluteFotoPath, buffer);

    try {
      const createKakomlekdamLampau =
        await this.prismaService.kakomlekdam_lampau.create({
          data: {
            fotoPath: relativeFotoPath,
          },
        });

      log(createKakomlekdamLampau);

      return {
        success: true,
        message: 'Berhasil tambah data kepala satuan lampau',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.kakomlekdam_lampau.count();
    const filtered = await this.prismaService.kakomlekdam_lampau.count({});
    const paged = await this.prismaService.kakomlekdam_lampau.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
    });

    log(paged);

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
      const kepalaSatuanLampau =
        await this.prismaService.kakomlekdam_lampau.findMany();

      return kepalaSatuanLampau;
    } catch (error) {
      log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} kepalaSatuanLampau`;
  }

  async update(id: number, foto: Express.Multer.File) {
    const { originalname, buffer } = foto;

    const relativeFotoPath = Date.now() + '-' + originalname;
    const absoluteFotoPath = join(
      process.cwd(),
      'public/profil/kakomlekdam_lampau',
      relativeFotoPath,
    );

    writeFileSync(absoluteFotoPath, buffer);

    const previousData = await this.prismaService.kakomlekdam_lampau.findFirst({
      where: {
        id,
      },
    });

    const absolutePathToDelete = join(
      process.cwd(),
      'public/profil/kakomlekdam_lampau',
      previousData.fotoPath,
    );

    unlinkSync(absolutePathToDelete);

    const updateData = await this.prismaService.kakomlekdam_lampau.update({
      where: {
        id,
      },
      data: {
        fotoPath: relativeFotoPath,
      },
    });

    log(updateData.fotoPath);

    return {
      success: true,
      message: 'Berhasil edit foto',
    };
  }

  async remove(id: number) {
    try {
      const removeData = await this.prismaService.kakomlekdam_lampau.delete({
        where: { id },
      });

      const absoluteFotoPath = join(
        process.cwd(),
        'public/profil/kakomlekdam_lampau',
        removeData.fotoPath,
      );

      unlinkSync(absoluteFotoPath);

      return {
        success: true,
        message: 'Berhasil tambah data kepala satuan lampau',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }
}
