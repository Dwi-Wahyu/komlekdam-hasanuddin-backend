import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStrukturDto } from './dto/create-struktur.dto';
import { UpdateStrukturDto } from './dto/update-struktur.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StrukturService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createStrukturDto: CreateStrukturDto,
    gambar: Express.Multer.File,
  ) {
    try {
      const { filename } = gambar;

      createStrukturDto['gambar'] = filename;

      const inputToStruktur = await this.prismaService.struktur.create({
        data: createStrukturDto,
      });

      log(inputToStruktur);

      return 'Berhasil input ke dalam struktur';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const allStruktur = await this.prismaService.struktur.findMany();

      return allStruktur;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateStrukturDto: UpdateStrukturDto) {
    try {
      const updateStruktur = await this.prismaService.struktur.update({
        where: {
          id,
        },
        data: updateStrukturDto,
      });

      log(updateStruktur);

      return `Berhasil update data ${updateStruktur.nama}`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const hapusStruktur = await this.prismaService.struktur.delete({
        where: {
          id,
        },
      });

      const photoPath = join(
        process.cwd(),
        'public',
        'struktur',
        hapusStruktur.gambar,
      );

      unlinkSync(photoPath);

      return `Berhasil menghapus data ${hapusStruktur.nama}`;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updatePhoto(
    id: string,
    body: { previousPhotoPath: string },
    gambar: Express.Multer.File,
  ) {
    try {
      const { filename } = gambar;
      const { previousPhotoPath } = body;

      const photoPath = join(
        process.cwd(),
        'public',
        'struktur',
        previousPhotoPath,
      );

      unlinkSync(photoPath);

      const updateModel = await this.prismaService.struktur.update({
        where: {
          id,
        },
        data: {
          gambar: filename,
        },
      });

      log(updateModel);

      return 'Berhasil update gambar';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
