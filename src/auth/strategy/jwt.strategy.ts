import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import catchError from 'src/errors/catchError';

import { UserRes } from '@types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    private authService: AuthService,
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: any): Promise<UserRes> {
    console.log('payload: ', payload);
    return catchError<UserRes>(async () => {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: payload?.email || undefined,
        },

        select: {
          id: true,
          name: true,
          email: true,
          access: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    });
  }
}
