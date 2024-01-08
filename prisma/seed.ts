/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function registerUser() {
  const encPassword = await argon.hash('haris123');

  const user = await prisma.user.create({
    data: {
      password: encPassword,
      name: 'Haris Iqbal',
      email: 'haris6072@gmail.com',
      access: {
        privileges: 'super-admin',
        modules: ['*'],
      },
    },
  });
  console.log(user);
}

async function main() {
  await registerUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
