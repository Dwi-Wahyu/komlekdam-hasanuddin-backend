import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStatistikDto } from './dto/create-statistik.dto';
import { UpdateStatistikDto } from './dto/update-statistik.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { CreateDataStatistikDto } from './dto/create-data-statistik.dto';

@Injectable()
export class StatistikService {
  constructor(private readonly prismaService: PrismaService) {}

  async createStatistic(createStatistikDto: CreateStatistikDto) {
    try {
      const createStatistics = await this.prismaService.statistik.create({
        data: createStatistikDto,
      });

      return 'Berhasil input statistik';
    } catch (error) {
      log(error);
      throw new InternalServerErrorException();
    }
  }

  async createDataStatistics(createDataStatistics: CreateDataStatistikDto) {
    try {
      const createData = await this.prismaService.data_statistik.create({
        data: createDataStatistics,
      });

      return 'Berhasil input statistik';
    } catch (error) {
      log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const allStatistik = await this.prismaService.statistik.findMany({
        include: {
          data: true,
        },
      });

      return allStatistik;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const statistik = await this.prismaService.statistik.findFirst({
        where: {
          id,
        },
        include: {
          data: true,
        },
      });

      return statistik;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateStatistikDto: UpdateStatistikDto) {
    const { nama_statistik, data } = updateStatistikDto;

    const updateStatistik = await this.prismaService.statistik.update({
      where: {
        id,
      },
      data: {
        nama_statistik,
      },
    });

    for (const item of data) {
      const updateData = await this.prismaService.data_statistik.update({
        where: {
          id: item.id,
          id_statistik: id,
        },
        data: {
          kategori: item.kategori as string,
          persentase: item.persentase as string,
        },
      });
    }

    return `Berhasil update #${id} statistik`;
  }

  async remove(id: string) {
    try {
      const removeStatistik = await this.prismaService.statistik.delete({
        where: {
          id,
        },
      });

      log(removeStatistik);

      return `This action removes a #${id} statistik`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
