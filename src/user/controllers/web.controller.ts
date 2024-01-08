import { Controller, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorators';
import { UserRes } from '@types';

@Controller('web/user')
export class UserWebController extends UserController {
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('/')
  current(@GetUser() user: UserRes) {
    return this.getUserService().userProfile(user?.id);
  }
}
