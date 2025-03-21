import { configDotenv } from 'dotenv';

configDotenv();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const superadminUsername = process.env.SUPERADMIN_USERNAME;
  const superadminPassword = process.env.SUPERADMIN_PASSWORD;

  const createSuperadmin = await prisma.pengguna.upsert({
    where: {
      username: superadminUsername,
    },
    update: {},
    create: {
      nama: 'superadmin',
      username: superadminUsername as string,
      password: superadminPassword as string,
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
