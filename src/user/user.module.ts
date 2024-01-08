import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserAppController } from './controllers/app.controller';
import { UserWebController } from './controllers/web.controller';

@Module({
  controllers: [UserAppController, UserWebController],
  providers: [UserService],
})
export class UserModule {}
