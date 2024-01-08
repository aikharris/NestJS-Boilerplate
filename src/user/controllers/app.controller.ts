import { Controller, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { UserRes } from '@types';

@Controller('app/user')
export class UserAppController extends UserController {
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('/')
  current(@GetUser() user: UserRes) {
    return this.getUserService().userProfile(user?.id);
  }
}
