import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';
import { DatatableQuery } from 'src/common/types/datatable.query.types';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { nama, password, username, role } = createUserDto;
    try {
      const hashedPassword = await this.authService.hashPassword(password);

      const user = await this.prismaService.user.create({
        data: {
          nama,
          username,
          password: hashedPassword,
          role,
        },
      });

      log(user);

      return {
        success: true,
        message: 'Berhasil input user',
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async findData(query: DatatableQuery) {
    const { per_page, page, search } = query;

    const totalDatas = await this.prismaService.user.count();
    const filtered = await this.prismaService.user.count({
      where: {
        nama: {
          contains: search,
        },
      },
    });
    const paged = await this.prismaService.user.findMany({
      skip: (parseInt(page) - 1) * parseInt(per_page),
      take: parseInt(per_page),
      where: {
        nama: {
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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id },
      });

      return user;
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { username, nama, role } = updateUserDto;

      const updateUser = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          username,
          nama,
          role,
        },
      });

      log(updateUser);

      return {
        success: true,
        message: 'Berhasil udpate data ' + updateUser.nama,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async updatePassword(id: number, updatePasswordDto: { password: string }) {
    try {
      const password = await this.authService.hashPassword(
        updatePasswordDto.password,
      );

      const update = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          password,
        },
      });

      log(update);

      return {
        success: true,
        message: 'Berhasil update password ' + update.nama,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const removeUser = await this.prismaService.user.delete({
        where: {
          id,
        },
      });

      log(removeUser);

      return {
        success: true,
        message: 'Berhasil menghapus user ' + removeUser.nama,
      };
    } catch (error) {
      log(error);
      return new InternalServerErrorException(error);
    }
  }
}
