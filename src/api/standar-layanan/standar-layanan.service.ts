import { Injectable } from '@nestjs/common';
import { CreateStandarLayananDto } from './dto/create-standar-layanan.dto';
import { UpdateStandarLayananDto } from './dto/update-standar-layanan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { log } from 'console';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class StandarLayananService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(body: CreateStandarLayananDto) {
    const { label, value } = body;

    const joinedLabel = 'standar-layanan-' + label;

    const update = await this.prismaService.data_lainnya.update({
      where: {
        label: joinedLabel,
      },
      data: {
        value,
      },
    });

    log(update);

    return {
      success: true,
    };
  }

  async updateWithFile(
    body: CreateStandarLayananDto,
    file: Express.Multer.File,
  ) {
    const { label } = body;

    const joinedLabel = 'standar-layanan-' + label;

    const findLabel = await this.prismaService.data_lainnya.findFirst({
      where: {
        label: joinedLabel,
      },
    });

    if (!findLabel) {
      return {
        success: false,
        error: 'Label tidak ditemukan',
      };
    }

    const previousPath = join(
      process.cwd(),
      'public/standar-layanan',
      findLabel.value,
    );

    await unlinkSync(previousPath);

    const update = await this.prismaService.data_lainnya.update({
      where: {
        label: joinedLabel,
      },
      data: {
        value: file.filename,
      },
    });

    log(update);

    return {
      success: true,
    };
  }

  async findAll() {
    const data = await this.prismaService.data_lainnya.findMany({
      where: {
        label: {
          startsWith: 'standar-layanan-',
        },
      },
    });

    return data.map((item) => {
      let type: 'link' | 'document' | 'image' | 'video' = 'document';

      if (item.value.startsWith('http')) {
        type = 'link';
      } else if (item.value.endsWith('.pdf') || item.value.endsWith('.docx')) {
        type = 'document';
      } else if (
        item.value.endsWith('.jpg') ||
        item.value.endsWith('.jpeg') ||
        item.value.endsWith('.png')
      ) {
        type = 'image';
      } else if (
        item.value.endsWith('.mp4') ||
        item.value.endsWith('.mov') ||
        item.value.endsWith('.avi')
      ) {
        type = 'video';
      }

      return {
        label: item.label.replace('standar-layanan-', ''),
        value: item.value,
        type,
        fileUrl:
          type !== 'link' ? `/standar-layanan/${item.value}` : item.value,
      };
    });
  }

  async getFile(filename: string, res: Response) {
    const filePath = join(
      process.cwd(),
      'uploads',
      'standar-layanan',
      filename,
    );

    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    // Set appropriate headers based on file type
    if (filename.endsWith('.pdf')) {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (filename.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    } else if (filename.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }

    return createReadStream(filePath).pipe(res);
  }

  findOne(id: number) {
    return `This action returns a #${id} standarLayanan`;
  }

  remove(id: number) {
    return `This action removes a #${id} standarLayanan`;
  }
}
