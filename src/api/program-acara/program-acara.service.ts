import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProgramAcaraDto } from './dto/create-program-acara.dto';
import { UpdateProgramAcaraDto } from './dto/update-program-acara.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class ProgramAcaraService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProgramAcaraDto: CreateProgramAcaraDto) {
    try {
      const createProgramAcara = await this.prismaService.program_acara.create({
        data: createProgramAcaraDto,
      });

      log(createProgramAcara);

      return 'Berhasil Membuat program acara';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const allProgram = await this.prismaService.program_acara.findMany({
      orderBy: {
        startTime: 'asc',
      },
    });

    return allProgram;
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.program_acara.count();
    const filtered = await this.prismaService.program_acara.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.program_acara.findMany({
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
      data: {
        data: paged,
        totalDatas,
        totalPages,
        currentPage: parseInt(page),
      },
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} programAcara`;
  }

  async update(id: string, updateProgramAcaraDto: UpdateProgramAcaraDto) {
    try {
      const updateProgram = await this.prismaService.program_acara.update({
        where: {
          id,
        },
        data: updateProgramAcaraDto,
      });

      log(updateProgram);

      return `Berhasil update ${id} program acara`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const hapusProgram = await this.prismaService.program_acara.delete({
        where: {
          id,
        },
      });

      log(hapusProgram);

      return `Berhasil menghapus ${id} program acara`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
