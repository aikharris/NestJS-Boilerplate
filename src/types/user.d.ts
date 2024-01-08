import { User } from '@prisma/client';

export type UserRes = Omit<User,  'password'>;
