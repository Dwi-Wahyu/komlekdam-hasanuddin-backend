import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class ProgramService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File[],
    dokumentasi: Express.Multer.File[],
    createProgramDto: CreateProgramDto,
  ) {
    const { judul, kategori, detail, tanggal, deskripsi } = createProgramDto;

    const thumbnailAbsolutePath = join(
      process.cwd(),
      'public',
      kategori,
      'thumbnail',
      thumbnail[0].originalname,
    );

    const createProgram = await this.prismaService.program.create({
      data: {
        judul,
        kategori,
        deskripsi,
        detail,
        tanggal,
        thumbnailPath: thumbnail[0].originalname,
      },
    });

    log(createProgram);

    writeFileSync(thumbnailAbsolutePath, thumbnail[0].buffer);

    const dokumentasiPath = [];

    for (const each of dokumentasi) {
      const dokumentasiAbsolutePath = join(
        process.cwd(),
        'public',
        kategori,
        'dokumentasi',
        each.originalname,
      );

      writeFileSync(dokumentasiAbsolutePath, each.buffer);

      dokumentasiPath.push(each.originalname);
    }

    const createDokumentasi =
      await this.prismaService.dokumentasi_program.createMany({
        data: dokumentasiPath.map((path) => ({
          path,
          id_program: createProgram.id,
        })),
      });

    log(createDokumentasi);

    return {
      success: true,
      message: 'Berhasil tambah program',
    };
  }

  findAll() {
    return `This action returns all program`;
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.program.count();
    const filtered = await this.prismaService.program.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.program.findMany({
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

  async findOne(id: string) {
    try {
      const program = await this.prismaService.program.findFirst({
        where: {
          id,
        },
        include: {
          dokumentasi: {
            select: {
              path: true,
            },
          },
        },
      });

      return program;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  update(id: string, updateProgramDto: UpdateProgramDto) {
    return `This action updates a #${id} program`;
  }

  async remove(id: string) {
    const program = await this.prismaService.program.findFirst({
      where: {
        id,
      },
      include: {
        dokumentasi: {
          select: {
            path: true,
          },
        },
      },
    });

    const thumbnailPath = join(
      process.cwd(),
      program.kategori,
      'thumbnail',
      program.thumbnailPath,
    );
    unlinkSync(thumbnailPath);

    for (const dokumentasi of program.dokumentasi) {
      const { path } = dokumentasi;
      const dokumentasiPath = join(
        process.cwd(),
        program.kategori,
        'dokumentasi',
        path,
      );
      unlinkSync(dokumentasiPath);
    }

    const deleteProgram = await this.prismaService.program.delete({
      where: {
        id,
      },
    });

    log(deleteProgram);

    return {
      success: true,
      message: 'Berhasil menghapus program',
    };
  }
}
