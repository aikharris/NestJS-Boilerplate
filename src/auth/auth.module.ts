import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategy';

import { AuthWebController } from './controllers/web.controller';
import { AuthAppController } from './controllers/app.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        };
      },
    }),
  ],
  controllers: [AuthWebController, AuthAppController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}


