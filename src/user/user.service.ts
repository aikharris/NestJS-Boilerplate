import { Injectable } from '@nestjs/common';
import { UserRes } from '@types';
import { PrismaService } from 'src/prisma/prisma.service';
import { catchError, AppError, StatusCodes } from 'src/errors';

@Injectable()
export class UserService {
 constructor(
    private prisma: PrismaService,
  ) {}

  public async userProfile(id: string): Promise<UserRes> {
    return catchError<UserRes>(async () => {
     return await this.prisma.user.findUnique({where: {id}})
    })
  }
}
