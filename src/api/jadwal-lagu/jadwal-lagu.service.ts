import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJadwalLaguDto } from './dto/create-jadwal-lagu.dto';
import { UpdateJadwalLaguDto } from './dto/update-jadwal-lagu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment';
import { log } from 'console';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { Prisma } from '@prisma/client';

@Injectable()
export class JadwalLaguService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    lagu: Express.Multer.File,
    createJadwalLaguDto: CreateJadwalLaguDto,
  ) {
    const { judul, mulai, selesai } = createJadwalLaguDto;
    const { buffer, originalname } = lagu;
    try {
      const laguPath = Date.now() + '-' + originalname;
      const laguAbsolutePath = join(
        process.cwd(),
        'public',
        'jadwal-lagu',
        laguPath,
      );

      writeFileSync(laguAbsolutePath, buffer);

      const mulaiTime = moment(mulai, 'HH:mm');
      const selesaiTime = moment(selesai, 'HH:mm');
      const durasiMs = selesaiTime.diff(mulaiTime);

      const durasi = moment.duration(durasiMs);

      const durasiFormatted = `${Math.floor(durasi.hours())} jam ${durasi.minutes()} menit`;

      const jadwalLagu = await this.prismaService.jadwal_lagu.create({
        data: {
          durasi: durasiFormatted,
          judul,
          mulai,
          selesai,
          laguPath,
        },
      });

      log(jadwalLagu);

      return {
        success: true,
        message: 'Berhasil tambah jadwal lagu',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.jadwal_lagu.count();
    const filtered = await this.prismaService.jadwal_lagu.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.jadwal_lagu.findMany({
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

  async findOne(id: number) {
    try {
      const jadwalLagu = await this.prismaService.jadwal_lagu.findUnique({
        where: {
          id,
        },
      });

      return jadwalLagu;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updateLagu(id: number, lagu: Express.Multer.File) {
    const { originalname, buffer } = lagu;

    try {
      const jadwalLagu = await this.prismaService.jadwal_lagu.findFirst({
        where: { id },
      });

      const laguPath = Date.now() + '-' + originalname;

      const fileToDelete = join(
        process.cwd(),
        'public',
        'jadwal-lagu',
        jadwalLagu.laguPath,
      );

      const fileToWrite = join(
        process.cwd(),
        'public',
        'jadwal-lagu',
        laguPath,
      );

      unlinkSync(fileToDelete);
      writeFileSync(fileToWrite, buffer);

      const updateJadwalLagu = await this.prismaService.jadwal_lagu.update({
        where: {
          id,
        },
        data: {
          laguPath,
        },
      });

      log(updateJadwalLagu);

      return {
        success: true,
        message: 'Berhasil update lagu',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findNow() {
    try {
      const allJadwal = await this.prismaService.jadwal_lagu.findMany();

      const modeStreaming = await this.prismaService.data_lainnya.findFirst({
        where: {
          label: 'streaming-mode-radio',
        },
      });

      const sekarang = moment();

      let jadwalSekarang = {};
      let adaJadwal = false;

      for (const jadwal of allJadwal) {
        const mulaiTime = moment(jadwal.mulai, 'HH:mm');
        const selesaiTime = moment(jadwal.selesai, 'HH:mm');

        if (sekarang.isBetween(mulaiTime, selesaiTime)) {
          jadwalSekarang = jadwal;
          adaJadwal = true;
        }
      }

      return { jadwalSekarang, adaJadwal, modeStreaming };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateJadwalLaguDto: UpdateJadwalLaguDto) {
    try {
      const { judul, mulai, selesai } = updateJadwalLaguDto;

      const mulaiTime = moment(mulai, 'HH:mm');
      const selesaiTime = moment(selesai, 'HH:mm');
      const durasiMs = selesaiTime.diff(mulaiTime);

      const durasi = moment.duration(durasiMs);

      const durasiFormatted = `${Math.floor(durasi.hours())} jam ${durasi.minutes()} menit`;

      const updateJadwalLagu = await this.prismaService.jadwal_lagu.update({
        where: {
          id,
        },
        data: {
          judul,
          mulai,
          selesai,
          durasi: durasiFormatted,
        },
      });

      log(updateJadwalLagu);

      return {
        success: true,
        message: 'Berhasil update jadwal lagu',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const deleteJadwalLagu = await this.prismaService.jadwal_lagu.delete({
        where: {
          id,
        },
      });

      const fileToDelete = join(
        process.cwd(),
        'public',
        'jadwal-lagu',
        deleteJadwalLagu.laguPath,
      );

      unlinkSync(fileToDelete);

      log(deleteJadwalLagu);

      return {
        success: true,
        message: 'Berhasil hapus jadwal lagu',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async getStreamingMode() {
    const result = await this.prismaService.data_lainnya.findFirst({
      where: {
        label: 'streaming-mode-radio',
      },
    });

    return { result };
  }

  async toggleRadio() {
    const existing = await this.prismaService.data_lainnya.findFirst({
      where: {
        label: 'streaming-mode-radio',
      },
    });

    if (!existing) {
      const create = await this.prismaService.data_lainnya.create({
        data: {
          label: 'streaming-mode-radio',
          value: 'true',
        },
      });

      return { result: create };
    }

    const value = existing.value === 'true' ? 'false' : 'true';

    const result = await this.prismaService.data_lainnya.update({
      where: {
        label: 'streaming-mode-radio',
      },
      data: {
        value,
      },
    });

    return {
      success: true,
      result,
    };
  }
}
