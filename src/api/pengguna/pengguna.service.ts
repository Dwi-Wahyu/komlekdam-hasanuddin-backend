import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePenggunaDto } from './dto/create-pengguna.dto';
import { UpdatePenggunaDto } from './dto/update-pengguna.dto';
import { log } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenggunaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createPenggunaDto: CreatePenggunaDto) {
    const { username, password } = createPenggunaDto;

    if (!username || !password) {
      return new HttpException(
        'Please insert username or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.authService.hashPassword(password);

    await this.prismaService.pengguna.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return 'Berhasil input pengguna';
  }

  async findAll() {
    const allPengguna = await this.prismaService.pengguna.findMany();

    return allPengguna;
  }

  async findOne(id: string) {
    try {
      const pengguna = await this.prismaService.pengguna.findFirst({
        where: {
          id,
        },
      });

      if (!pengguna) {
        return new HttpException('Pengguna Not Found', HttpStatus.NOT_FOUND);
      }

      return pengguna;
    } catch (error) {
      return new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePenggunaDto: UpdatePenggunaDto) {
    const { username } = updatePenggunaDto;

    try {
      const update = await this.prismaService.pengguna.update({
        where: {
          id,
        },
        data: {
          username,
        },
      });

      log(update);

      return `Berhasil update pengguna`;
    } catch (error) {
      return new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const hapusPengguna = await this.prismaService.pengguna.delete({
        where: {
          id,
        },
      });

      return 'Berhasil hapus pengguna ' + hapusPengguna.username;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return `This action removes a #${id} pengguna`;
  }
}
