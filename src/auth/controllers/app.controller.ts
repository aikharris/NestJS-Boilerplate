import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { LoginDTO } from '../dto/login.dto';

@Controller('app/auth')
export class AuthAppController extends AuthController {
  

  @HttpCode(HttpStatus.OK)
  @Post('login') // /app/auth/login
  login(@Body() dto: LoginDTO) {
    return this.getAuthService().login(dto);
  }
}
