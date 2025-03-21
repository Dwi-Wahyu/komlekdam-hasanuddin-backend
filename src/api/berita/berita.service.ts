import { Injectable } from '@nestjs/common';
import { CreateBeritaDto } from './dto/create-berita.dto';
import { UpdateBeritaDto } from './dto/update-berita.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class BeritaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    thumbnail: Express.Multer.File,
    createBeritaDto: CreateBeritaDto,
  ) {
    const { originalname: thumbnailPath, buffer } = thumbnail;
    const { judul, penulis, lokasi, kategori, deskripsi, tanggal, detail } =
      createBeritaDto;

    const thumbnailAbsolutePath = join(
      process.cwd(),
      'public/berita/thumbnail',
      thumbnailPath,
    );

    writeFileSync(thumbnailAbsolutePath, buffer);

    const createBerita = await this.prismaService.berita.create({
      data: {
        judul,
        penulis,
        lokasi,
        deskripsi,
        tanggal,
        detail,
        kategori,
        thumbnailPath,
      },
    });

    log(createBerita);

    return {
      success: true,
      message: 'Berhasil publish berita',
    };
  }

  findAll() {
    return `This action returns all berita`;
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.berita.count();
    const filtered = await this.prismaService.berita.count({
      where: {
        judul: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.berita.findMany({
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

  findOne(id: number) {
    return `This action returns a #${id} berita`;
  }

  update(id: number, updateBeritaDto: UpdateBeritaDto) {
    return `This action updates a #${id} berita`;
  }

  remove(id: number) {
    return `This action removes a #${id} berita`;
  }
}
