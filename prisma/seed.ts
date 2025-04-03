import { configDotenv } from 'dotenv';

configDotenv();

import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  const superadminUsername = process.env.SUPERADMIN_USERNAME;
  const superadminPassword = process.env.SUPERADMIN_PASSWORD;

  const password = await hashSync(superadminPassword, 8);

  const createSuperadmin = await prisma.user.upsert({
    where: {
      username: superadminUsername,
    },
    update: {},
    create: {
      nama: 'superadmin',
      role: 'Administrator',
      username: superadminUsername as string,
      password,
    },
  });

  const dataLainnya = await prisma.data_lainnya.upsert({
    where: {
      nomor: 1,
    },
    update: {},
    create: {
      label: 'link-streaming',
      value: 'https://www.youtube.com/watch?v=PvpTcaHTpHw',
    },
  });

  console.log(createSuperadmin);
  console.log(dataLainnya);
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
