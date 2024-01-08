import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register() {
    return 'Register';
  }

  public getAuthService(): AuthService {
    return this.authService;
  }
}
