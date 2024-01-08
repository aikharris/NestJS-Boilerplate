import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { catchError, AppError, StatusCodes } from 'src/errors';

import type { UserRes } from '@types';
import { LoginDTO } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  public async login(dto: LoginDTO): Promise<UserRes> {
    return catchError<UserRes>(async () => {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },

        select: {
          name: true,
          email: true,
          access: true,
          createdAt: true,
          updatedAt: true,
          password: true,
          id: true,
        },
      });

      const isValidPassword = await argon.verify(user.password, dto.password);

      if (!isValidPassword)
        throw new AppError('Invalid password', StatusCodes.UNAUTHORIZED);

      const userId: string = user.id;

      delete user.password;
      delete user.id;

      return {
        ...user,
        token: await this.signToken(userId, user.email, user.name),
      };
    });
  }

  register(): void {}

  private signToken(id: string, email: string, name: string) {
    const payload = {
      sub: id,
      email,
      name,
    };

    return this.jwt.signAsync(payload);
  }
}
