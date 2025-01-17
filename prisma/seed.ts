import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { content } from './data';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    const kataSambutan = await prisma.kata_sambutan.create({
      data: {
        content,
      },
    });

    log(kataSambutan);

    const hashedPassword = await hashSync('secret', 10);

    const createSuperadmin = await prisma.pengguna.create({
      data: {
        username: 'superadmin',
        password: hashedPassword,
      },
    });

    log(createSuperadmin);
  } catch (error) {
    log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
