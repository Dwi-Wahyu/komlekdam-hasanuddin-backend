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

  await createStandarLayananData();

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

async function createStandarLayananData() {
  const layananMinmathub = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-minmathub',
    },
    update: {
      value: 'https://forms.gle/HrScPMBPrMtDbe798',
    },
    create: {
      label: 'standar-layanan-minmathub',
      value: 'https://forms.gle/HrScPMBPrMtDbe798',
    },
  });

  const suratTelegram = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-surat-telegram',
    },
    update: {
      value: 'surat telegram.pdf',
    },
    create: {
      label: 'standar-layanan-surat-telegram',
      value: 'surat telegram.pdf',
    },
  });

  const suratEdaran = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-surat-edaran',
    },
    update: {
      value: 'surat edaran.pdf',
    },
    create: {
      label: 'standar-layanan-surat-edaran',
      value: 'surat edaran.pdf',
    },
  });

  const qrcodeKTA = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-qr-kta',
    },
    update: {
      value: 'qrcode-kta.jpg',
    },
    create: {
      label: 'standar-layanan-qr-kta',
      value: 'qrcode-kta.jpg',
    },
  });

  const qrcodeKPI = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-qr-kpi',
    },
    update: {
      value: 'qrcode-kpi.jpg',
    },
    create: {
      label: 'standar-layanan-qr-kpi',
      value: 'qrcode-kpi.jpg',
    },
  });

  const har0 = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-har-0',
    },
    update: {
      value: 'har-0.mp4',
    },
    create: {
      label: 'standar-layanan-har-0',
      value: 'har-0.mp4',
    },
  });

  const har1 = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-har-1',
    },
    update: {
      value: 'har-1.mp4',
    },
    create: {
      label: 'standar-layanan-har-1',
      value: 'har-1.mp4',
    },
  });

  const har2 = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-har-2',
    },
    update: {
      value: 'har-2.mp4',
    },
    create: {
      label: 'standar-layanan-har-2',
      value: 'har-2.mp4',
    },
  });

  const har3 = await prisma.data_lainnya.upsert({
    where: {
      label: 'standar-layanan-har-3',
    },
    update: {
      value: 'har-3.mp4',
    },
    create: {
      label: 'standar-layanan-har-3',
      value: 'har-3.mp4',
    },
  });
}
