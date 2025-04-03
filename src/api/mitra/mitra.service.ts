import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMitraDto } from './dto/create-mitra.dto';
import { UpdateMitraDto } from './dto/update-mitra.dto';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { CreateDokumentasiMitraDto } from './dto/create-dokumentasi.dto';

@Injectable()
export class MitraService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(logo: Express.Multer.File, createMitraDto: CreateMitraDto) {
    const { originalname, buffer } = logo;
    const { nama } = createMitraDto;

    try {
      const logoPath = Date.now() + '-' + originalname;

      const absolutePasfotoPath = join(
        process.cwd(),
        'public/profil/mitra/logo',
        logoPath,
      );

      writeFileSync(absolutePasfotoPath, buffer);

      const createMitra = await this.prismaService.mitra.create({
        data: {
          nama,
          logoPath,
        },
      });

      log(createMitra);

      return {
        success: true,
        message: 'Berhasil tambah data mitra',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async createDokumentasi(
    id_mitra: number,
    gambar: Express.Multer.File,
    createMitraDto: CreateDokumentasiMitraDto,
  ) {
    const { originalname, buffer } = gambar;
    const { narasi_keterangan, judul_keterangan } = createMitraDto;

    try {
      const relativeDokumentasiPath = Date.now() + '-' + originalname;

      const absolutePasfotoPath = join(
        process.cwd(),
        'public/profil/mitra/dokumentasi',
        relativeDokumentasiPath,
      );

      writeFileSync(absolutePasfotoPath, buffer);

      const createDokumentasiMitra =
        await this.prismaService.dokumentasi_mitra.create({
          data: {
            id_mitra,
            narasi_keterangan,
            judul_keterangan,
            dokumentasiPath: relativeDokumentasiPath,
          },
        });

      log(createDokumentasiMitra);

      return {
        success: true,
        message: 'Berhasil tambah dokumentasi',
      };
    } catch (error) {
      log(error);
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

  async findAll() {
    try {
      const allMitra = await this.prismaService.mitra.findMany();

      return allMitra;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const mitra = await this.prismaService.mitra.findFirst({
        where: {
          id,
        },
        include: {
          dokumentasi: {
            select: {
              dokumentasiPath: true,
              judul_keterangan: true,
              narasi_keterangan: true,
            },
          },
        },
      });

      return mitra;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async hapusDokumentasi(
    id: number,
    hapusDokumentasiDto: { dokumentasiDipilih: string },
  ) {
    const { dokumentasiDipilih } = hapusDokumentasiDto;

    const parseDokumentasiDipilih = Array.isArray(dokumentasiDipilih)
      ? dokumentasiDipilih
      : JSON.parse(dokumentasiDipilih);

    const deleteDokumentasi =
      await this.prismaService.dokumentasi_mitra.deleteMany({
        where: { dokumentasiPath: { in: parseDokumentasiDipilih } },
      });

    for (const each of parseDokumentasiDipilih) {
      const absoluteGambarPath = join(
        process.cwd(),
        'public/profil/mitra/dokumentasi',
        each,
      );
      unlinkSync(absoluteGambarPath);
    }

    return {
      success: true,
      message: 'Berhasil hapus dokumentasi',
    };
  }

  async update(id: number, updateMitraDto: UpdateMitraDto) {
    try {
      const updateMitra = await this.prismaService.mitra.update({
        where: {
          id,
        },
        data: updateMitraDto,
      });

      log(updateMitra);

      return {
        success: true,
        message: 'Berhasil update data mitra',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateLogo(id: number, logo: Express.Multer.File) {
    const { originalname, buffer } = logo;

    try {
      const mitra = await this.prismaService.mitra.findFirst({
        where: { id },
      });

      const logoPath = Date.now() + '-' + originalname;

      const fileToDelete = join(
        process.cwd(),
        'public/profil/mitra/logo',
        mitra.logoPath,
      );
      const fileToWrite = join(
        process.cwd(),
        'public/profil/mitra/logo',
        logoPath,
      );

      unlinkSync(fileToDelete);
      writeFileSync(fileToWrite, buffer);

      const updateLogoMitra = await this.prismaService.mitra.update({
        where: {
          id,
        },
        data: {
          logoPath,
        },
      });

      log(updateLogoMitra);

      return {
        success: true,
        message: 'Berhasil update logo',
      };
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} mitra`;
  }
}
