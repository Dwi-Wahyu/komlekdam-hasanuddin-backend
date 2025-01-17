import { Injectable } from '@nestjs/common';
import { UpdateKataSambutanDto } from './dto/update-kata-sambutan.dto';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KataSambutanService {
  constructor(private readonly prismaService: PrismaService) {}

  async find() {
    const kataSambutan = await this.prismaService.kata_sambutan.findMany();

    return kataSambutan[0];
  }

  async update(id: string, updateKataSambutanDto: UpdateKataSambutanDto) {
    const { content } = updateKataSambutanDto;

    const updateKataSambutan = await this.prismaService.kata_sambutan.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    log(updateKataSambutan);

    return `This action updates a #${id} kataSambutan`;
  }
}
