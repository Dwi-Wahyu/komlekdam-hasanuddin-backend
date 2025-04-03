import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/sigin.dto';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hashSync(password, 10);

    return hashedPassword;
  }

  async comparePassword(password: string, hashedPassword) {
    const passwordValid = await bcrypt.compareSync(password, hashedPassword);

    return passwordValid;
  }

  async handleLogin(loginData: SignInDto) {
    const { username, password } = loginData;

    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Username atau Password salah');
    }

    const passwordValid = await this.comparePassword(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Username atau Password salah');
    }

    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
      }),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        nama: user.nama,
      },
    };
  }
}
