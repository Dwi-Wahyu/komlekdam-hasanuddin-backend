import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatatableQuery } from 'src/common/types/datatable.query.types';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ArtikelService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createArtikelDto: CreateArtikelDto,
    thumbnail: Express.Multer.File,
  ) {
    try {
      const { filename } = thumbnail;

      createArtikelDto['thumbnail'] = filename;

      const createArtikel = await this.prismaService.artikel.create({
        data: createArtikelDto,
      });

      log(createArtikel);

      return 'Berhasil publish artikel';
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async findArtikel(query: { take: string }) {
    try {
      const take = parseInt(query.take);

      const data = await this.prismaService.artikel.findMany({
        take,
        orderBy: {
          createdAt: 'desc',
        },
      });

      return data;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.artikel.count();
    const filtered = await this.prismaService.artikel.count({
      where: {
        title: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.artikel.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        title: {
          contains: search,
        },
      },
    });

    log(paged);

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

  async findOne(id: string) {
    try {
      const artikel = await this.prismaService.artikel.findFirst({
        where: {
          id,
        },
      });
      return artikel;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateArtikelDto: UpdateArtikelDto) {
    try {
      const artikel = await this.prismaService.artikel.update({
        where: {
          id,
        },
        data: updateArtikelDto,
      });

      log(artikel);

      return `This action updates a #${id} artikel`;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async handleLike(id: string) {
    try {
      const artikel = await this.prismaService.artikel.update({
        where: {
          id,
        },
        data: {
          like: {
            increment: 1,
          },
        },
      });

      log(artikel);

      return `Like Count : ${artikel.like}`;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async handleDislike(id: string) {
    try {
      const artikel = await this.prismaService.artikel.update({
        where: {
          id,
        },
        data: {
          dislike: {
            increment: 1,
          },
        },
      });

      log(artikel);

      return `Dislike Count : ${artikel.dislike}`;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async updatePhoto(
    id: string,
    body: { previousPhotoPath: string },
    thumbanil: Express.Multer.File,
  ) {
    try {
      const { filename } = thumbanil;
      const { previousPhotoPath } = body;

      const photoPath = join(
        process.cwd(),
        'public',
        'artikel',
        'thumbnail',
        previousPhotoPath,
      );

      unlinkSync(photoPath);

      const updateModel = await this.prismaService.artikel.update({
        where: {
          id,
        },
        data: {
          thumbnail: filename,
        },
      });

      log(updateModel);

      return 'Berhasil update gambar';
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const deleteRow = await this.prismaService.artikel.delete({
        where: {
          id,
        },
      });

      const path = join(
        process.cwd(),
        'public',
        'artikel',
        'thumbnail',
        deleteRow.thumbnail,
      );

      unlinkSync(path);

      log(deleteRow);

      return `Berhasil menghapus artikel`;
    } catch (error) {
      log(error);

      throw new InternalServerErrorException(error);
    }
  }
}
