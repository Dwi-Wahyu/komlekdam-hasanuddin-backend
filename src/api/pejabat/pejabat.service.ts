import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePejabatDto } from './dto/create-pejabat.dto';
import { UpdatePejabatDto } from './dto/update-pejabat.dto';
import { CreateKepalaDto } from './dto/create-kepala.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { UpdateKepalaDto } from './dto/update-kepala.dto';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class PejabatService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    pasfoto: Express.Multer.File,
    createPejabatDto: CreatePejabatDto,
  ) {
    const { originalname, buffer } = pasfoto;
    const { jabatan, nama } = createPejabatDto;

    const absolutePasfotoPath = join(
      process.cwd(),
      'public/profil/pejabat',
      originalname,
    );

    writeFileSync(absolutePasfotoPath, buffer);

    try {
      const createPejabat = await this.prismaService.pejabat_satuan.create({
        data: {
          nama,
          jabatan,
          pasfoto: originalname,
        },
      });

      log(createPejabat);

      return {
        success: true,
        message: 'Berhasil tambah data pejabat',
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

  async getOneKepala(jabatan: string) {
    try {
      if (jabatan === 'kakomlekdam') {
        const dataKakomlekdam =
          await this.prismaService.kakomlekdam.findFirst();

        return dataKakomlekdam;
      } else {
        const dataWakakomlekdam =
          await this.prismaService.wakakomlekdam.findFirst();

        return dataWakakomlekdam;
      }
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async createKepala(
    pasfoto: Express.Multer.File,
    createKepalaDto: CreateKepalaDto,
  ) {
    const { originalname, buffer } = pasfoto;

    const { nama, jabatan } = createKepalaDto;

    let filename = jabatan === 'kakomlekdam' ? 'kakomlekdam' : 'wakakomlekdam';
    filename = filename + extname(originalname);
    const absolutePath = join(process.cwd(), 'public/profil', filename);

    writeFileSync(absolutePath, buffer);

    if (jabatan == 'kakomlekdam') {
      const createKakomlekdam = await this.prismaService.kakomlekdam.create({
        data: {
          nama,
          pasfoto: filename,
        },
      });
      log(createKakomlekdam);
    } else {
      const createWakakomlekdam = await this.prismaService.wakakomlekdam.create(
        {
          data: {
            nama,
            pasfoto: filename,
          },
        },
      );
      log(createWakakomlekdam);
    }

    return {
      success: true,
      message: 'Berhasil tambah data ' + jabatan,
    };
  }

  async getKepala() {
    try {
      const kakomlekdam = await this.prismaService.kakomlekdam.findFirst();
      const wakakomlekdam = await this.prismaService.wakakomlekdam.findFirst();

      return {
        kakomlekdam,
        wakakomlekdam,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateKepala(jabatan: string, updateKepalaDto: UpdateKepalaDto) {
    const { nama } = updateKepalaDto;

    if (jabatan === 'kakomlekdam') {
      const updateKakomlekdam = await this.prismaService.kakomlekdam.update({
        where: {
          nomor: 1,
        },
        data: {
          nama,
        },
      });

      log(updateKakomlekdam);
    } else {
      const updateWakakomlekdam = await this.prismaService.wakakomlekdam.update(
        {
          where: {
            nomor: 1,
          },
          data: {
            nama,
          },
        },
      );

      log(updateWakakomlekdam);
    }

    return {
      success: true,
      message: 'Berhasil update ' + jabatan,
    };
  }

  async updatePasfoto(nomor: number, pasfoto: Express.Multer.File) {
    const { originalname, buffer } = pasfoto;

    try {
      const pejabat = await this.prismaService.pejabat_satuan.findFirst({
        where: { nomor },
      });

      const fileToDelete = join(
        process.cwd(),
        'public/profil/pejabat',
        pejabat.pasfoto,
      );
      const fileToWrite = join(
        process.cwd(),
        'public/profil/pejabat',
        originalname,
      );

      unlinkSync(fileToDelete);
      writeFileSync(fileToWrite, buffer);

      const updatePejabat = await this.prismaService.pejabat_satuan.update({
        where: {
          nomor,
        },
        data: {
          pasfoto: originalname,
        },
      });

      log(updatePejabat);

      return {
        success: true,
        message: 'Berhasil update pasfoto',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async updatePasfotoKepala(jabatan: string, pasfoto: Express.Multer.File) {
    const { originalname, buffer } = pasfoto;

    let filenameToDelete = '';
    let filenameToWrite = '';

    if (jabatan === 'kakomlekdam') {
      const kakomlekdamPasfoto = await this.prismaService.kakomlekdam.findFirst(
        {
          where: {
            nomor: 1,
          },
        },
      );

      filenameToWrite = 'kakomlekdam' + extname(originalname);
      filenameToDelete = kakomlekdamPasfoto.pasfoto;

      const updatePasfotoKakomlekdam =
        await this.prismaService.kakomlekdam.update({
          where: {
            nomor: 1,
          },
          data: {
            pasfoto: filenameToWrite,
          },
        });

      log(updatePasfotoKakomlekdam);
    } else {
      const wakakomlekdamPasfoto =
        await this.prismaService.wakakomlekdam.findFirst({
          where: {
            nomor: 1,
          },
        });

      filenameToWrite = 'wakakomlekdam' + extname(originalname);
      filenameToDelete = wakakomlekdamPasfoto.pasfoto;

      const updatePasfotoWakakomlekdam =
        await this.prismaService.wakakomlekdam.update({
          where: {
            nomor: 1,
          },
          data: {
            pasfoto: filenameToWrite,
          },
        });

      log(updatePasfotoWakakomlekdam);
    }

    const absolutePathToDelete = join(
      process.cwd(),
      'public/profil',
      filenameToDelete,
    );

    unlinkSync(absolutePathToDelete);

    const absolutePathToWrite = join(
      process.cwd(),
      'public/profil',
      filenameToWrite,
    );

    writeFileSync(absolutePathToWrite, buffer);

    return {
      success: true,
      message: 'Berhasil mengubah pasfoto ' + jabatan,
    };
  }

  findAll() {
    return `This action returns all pejabat`;
  }

  async findOne(nomor: number) {
    try {
      const pejabat = await this.prismaService.pejabat_satuan.findFirst({
        where: {
          nomor,
        },
      });

      log(pejabat);

      return pejabat;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async update(nomor: number, updatePejabatDto: UpdatePejabatDto) {
    try {
      const updatePejabat = await this.prismaService.pejabat_satuan.update({
        where: { nomor },
        data: updatePejabatDto,
      });

      log(updatePejabat);

      return {
        success: true,
        message: 'Berhasil update data pejabat',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async remove(nomor: number) {
    try {
      const deletePejabat = await this.prismaService.pejabat_satuan.delete({
        where: {
          nomor,
        },
      });

      const pasfotoAbsolutePath = join(
        process.cwd(),
        'public/profil/pejabat/',
        deletePejabat.pasfoto,
      );

      unlinkSync(pasfotoAbsolutePath);

      return {
        success: true,
        message: 'Berhasil menghapus data pejabat',
      };
    } catch (error) {}
  }
}
