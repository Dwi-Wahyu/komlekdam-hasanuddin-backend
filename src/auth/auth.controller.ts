import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sigin.dto';
import { Public } from './PublicDecorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  async handleLogin(@Body() loginData: SignInDto) {
    return this.authService.handleLogin(loginData);
  }
}
