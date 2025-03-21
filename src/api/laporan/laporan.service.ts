import { Injectable } from '@nestjs/common';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { UpdateLaporanDto } from './dto/update-laporan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';

@Injectable()
export class LaporanService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLaporanDto: CreateLaporanDto) {
    try {
      const createLaporan = await this.prismaService.laporan.create({
        data: createLaporanDto,
      });

      log(createLaporan);

      return {
        success: true,
        message: 'Berhasil membuat laporan',
      };
    } catch (error) {}
  }

  findAll() {
    return `This action returns all laporan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} laporan`;
  }

  update(id: number, updateLaporanDto: UpdateLaporanDto) {
    return `This action updates a #${id} laporan`;
  }

  remove(id: number) {
    return `This action removes a #${id} laporan`;
  }
}
