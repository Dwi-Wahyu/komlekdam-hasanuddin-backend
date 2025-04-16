import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { UpdateLaporanDto } from './dto/update-laporan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import * as moment from 'moment';
import * as ExcelJS from 'exceljs';
import { join } from 'path';
import { Response } from 'express';
import { unlinkSync } from 'fs';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class LaporanService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly twilioService: TwilioService,
  ) {}

  async create(createLaporanDto: CreateLaporanDto) {
    try {
      const { email, nama, nomor, pesan } = createLaporanDto;

      const diajukan_pada = moment().format('YYYY-MM-DD HH:mm');

      const createLaporan = await this.prismaService.laporan.create({
        data: {
          diajukan_pada,
          nama,
          email,
          nomor,
          pesan,
        },
      });

      log(createLaporan);

      this.twilioService.client.messages.create({
        body: 'halo',
        from: '+19895107915',
        to: '+6289643144013',
      });

      return {
        success: true,
        message: 'Berhasil membuat laporan',
      };
    } catch (error) {
      log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return `This action returns all laporan`;
    } catch (error) {}
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.laporan.count();
    const filtered = await this.prismaService.laporan.count({
      where: {
        nama: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.laporan.findMany({
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

  async exportExcel(res: Response) {
    try {
      const allLaporan = await this.prismaService.laporan.findMany({
        select: {
          diajukan_pada: true,
          email: true,
          nama: true,
          nomor: true,
          pesan: true,
        },
      });

      if (allLaporan.length === 0) {
        throw new BadRequestException('Belum ada laporan');
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      const headers = ['Nama', 'Email', 'Nomor WA', 'Pesan', 'Diajukan Pada'];
      const keys = ['nama', 'email', 'nomor', 'pesan', 'diajukan_pada'];

      worksheet.columns = headers.map((header, idx) => ({
        header,
        key: keys[idx],
        width: 35,
      }));

      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
      });

      for (const element of allLaporan) {
        worksheet.addRow(element);
      }

      const datetime = moment().format('YYYY_MM_DD-HH_mm');
      const relativePath = datetime + '.xlsx';
      const absolutePath = join(process.cwd(), 'public/laporan', relativePath);
      const createXLSX = await workbook.xlsx.writeFile(absolutePath);

      log(createXLSX);

      res.download(absolutePath, (err) => {
        unlinkSync(absolutePath);
      });
    } catch (error) {
      log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} laporan`;
  }

  update(id: number, updateLaporanDto: UpdateLaporanDto) {
    return `This action updates a #${id} laporan`;
  }

  async remove(id: number) {
    try {
      const deleteLaporan = await this.prismaService.laporan.delete({
        where: { id },
      });

      log(deleteLaporan);

      return {
        success: true,
      };
    } catch (error) {}
  }
}
