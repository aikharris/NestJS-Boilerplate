import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from '../dto';
import { AuthController } from './auth.controller';

@Controller('web/auth')
export class AuthWebController extends AuthController {

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDTO) {
    console.log(dto);
    return this.getAuthService().login(dto)
  }
}
