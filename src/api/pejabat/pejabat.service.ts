import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePejabatDto } from './dto/create-pejabat.dto';
import { UpdatePejabatDto } from './dto/update-pejabat.dto';
import { CreatePimpinanDto } from './dto/create-pimpinan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { extname, join } from 'path';
import { UpdateKepalaDto } from './dto/update-pimpinan.dto';
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

    const relativePasfotoPath = Date.now() + '-' + originalname;
    const absolutePasfotoPath = join(
      process.cwd(),
      'public/profil/pejabat',
      relativePasfotoPath,
    );

    writeFileSync(absolutePasfotoPath, buffer);

    try {
      const createPejabat = await this.prismaService.pejabat_satuan.create({
        data: {
          nama,
          jabatan,
          pasfoto: relativePasfotoPath,
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

  async getOnePimpinan(jabatan: string) {
    try {
      const pimpinan = await this.prismaService.pimpinan.findFirst({
        where: {
          jabatan,
        },
      });

      return pimpinan;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async createPimpinan(
    pasfoto: Express.Multer.File,
    createPimpinanDto: CreatePimpinanDto,
  ) {
    try {
      const { originalname, buffer } = pasfoto;

      const { nama, jabatan } = createPimpinanDto;

      const filename = jabatan + extname(originalname);
      const absolutePath = join(process.cwd(), 'public/profil', filename);

      const pimpinan = await this.prismaService.pimpinan.create({
        data: {
          nama,
          pasfoto: filename,
          jabatan,
        },
      });

      writeFileSync(absolutePath, buffer);

      return {
        success: true,
        message: 'Berhasil tambah data ' + jabatan,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async getAllPimpinan() {
    try {
      const kakomlekdam = await this.prismaService.pimpinan.findFirst({
        where: {
          jabatan: 'kakomlekdam',
        },
      });

      const wakakomlekdam = await this.prismaService.pimpinan.findFirst({
        where: {
          jabatan: 'wakakomlekdam',
        },
      });

      return { kakomlekdam, wakakomlekdam };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updatePimpinan(jabatan: string, updatePimpinanDto: UpdateKepalaDto) {
    const { nama } = updatePimpinanDto;

    const update = await this.prismaService.pimpinan.update({
      where: {
        jabatan,
      },
      data: {
        nama,
      },
    });

    log(update);

    return {
      success: true,
      message: 'Berhasil update ' + update.jabatan,
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

  async updatePasfotoPimpinan(jabatan: string, pasfoto: Express.Multer.File) {
    const { originalname, buffer } = pasfoto;

    const previousData = await this.prismaService.pimpinan.findFirst({
      where: {
        jabatan,
      },
    });

    let filenameToDelete = '';
    let filenameToWrite = '';

    filenameToWrite = previousData.jabatan + extname(originalname);
    filenameToDelete = previousData.pasfoto;

    const updatedPasfoto = await this.prismaService.pimpinan.update({
      where: {
        jabatan,
      },
      data: {
        pasfoto: filenameToWrite,
      },
    });

    log(updatedPasfoto);

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

  async findAll() {
    try {
      const allPejabat = await this.prismaService.pejabat_satuan.findMany();

      const pimpinan = await this.prismaService.pimpinan.findMany({
        where: {
          OR: [{ jabatan: 'kakomlekdam' }, { jabatan: 'wakakomlekdam' }],
        },
      });

      return { allPejabat, pimpinan };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
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
