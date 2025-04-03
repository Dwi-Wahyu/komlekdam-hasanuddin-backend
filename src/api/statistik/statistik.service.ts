import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatistikService {
  constructor(private readonly prismaService: PrismaService) {}

  async catat() {
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const catatQuery = await this.prismaService.pengunjung.upsert({
      where: { tanggal: hariIni },
      create: { tanggal: hariIni, jumlah: 1 },
      update: { jumlah: { increment: 1 } },
    });

    return {
      success: true,
    };
  }

  async dapatkanStatistik() {
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    // Hitung tanggal-tanggal penting
    const kemarin = new Date(hariIni);
    kemarin.setDate(kemarin.getDate() - 1);

    // Periode minggu ini
    const awalMingguIni = new Date(hariIni);
    awalMingguIni.setDate(awalMingguIni.getDate() - awalMingguIni.getDay());

    // Periode minggu kemarin
    const awalMingguLalu = new Date(awalMingguIni);
    awalMingguLalu.setDate(awalMingguLalu.getDate() - 7);
    const akhirMingguLalu = new Date(awalMingguIni);
    akhirMingguLalu.setSeconds(akhirMingguLalu.getSeconds() - 1);

    // Periode bulan ini
    const awalBulanIni = new Date(hariIni.getFullYear(), hariIni.getMonth(), 1);

    // Periode bulan kemarin
    const awalbulanLalu = new Date(
      hariIni.getFullYear(),
      hariIni.getMonth() - 1,
      1,
    );
    const akhirbulanLalu = new Date(awalBulanIni);
    akhirbulanLalu.setSeconds(akhirbulanLalu.getSeconds() - 1);

    // Eksekusi semua query secara paralel
    const [
      // Data pengunjung
      pengunjungHariIni,
      pengunjungKemarin,
      pengunjungMingguIni,
      pengunjungMingguLalu,
      pengunjungBulanIni,
      pengunjungBulanLalu,

      // Data pelaporan
      pelaporanMingguIni,
      pelaporanMingguLalu,
      pelaporanBulanIni,
      pelaporanbulanLalu,
    ] = await Promise.all([
      // Data pengunjung
      this.prismaService.pengunjung.findUnique({
        where: { tanggal: hariIni },
      }),
      this.prismaService.pengunjung.findUnique({
        where: { tanggal: kemarin },
      }),
      this.prismaService.pengunjung.aggregate({
        _sum: { jumlah: true },
        where: { tanggal: { gte: awalMingguIni } },
      }),
      this.prismaService.pengunjung.aggregate({
        _sum: { jumlah: true },
        where: {
          tanggal: {
            gte: awalMingguLalu,
            lte: akhirMingguLalu,
          },
        },
      }),
      this.prismaService.pengunjung.aggregate({
        _sum: { jumlah: true },
        where: { tanggal: { gte: awalBulanIni } },
      }),
      this.prismaService.pengunjung.aggregate({
        _sum: { jumlah: true },
        where: {
          tanggal: {
            gte: awalbulanLalu,
            lte: akhirbulanLalu,
          },
        },
      }),

      // Data pelaporan
      this.prismaService.laporan.count({
        where: { createdAt: { gte: awalMingguIni } },
      }),
      this.prismaService.laporan.count({
        where: {
          createdAt: {
            gte: awalMingguLalu,
            lte: akhirMingguLalu,
          },
        },
      }),
      this.prismaService.laporan.count({
        where: { createdAt: { gte: awalBulanIni } },
      }),
      this.prismaService.laporan.count({
        where: {
          createdAt: {
            gte: awalbulanLalu,
            lte: akhirbulanLalu,
          },
        },
      }),
    ]);

    return {
      // Data pengunjung
      pengunjung: {
        hariIni: pengunjungHariIni?.jumlah || 0,
        kemarin: pengunjungKemarin?.jumlah || 0,
        mingguIni: pengunjungMingguIni._sum.jumlah || 0,
        mingguLalu: pengunjungMingguLalu._sum.jumlah || 0,
        bulanIni: pengunjungBulanIni._sum.jumlah || 0,
        bulanLalu: pengunjungBulanLalu._sum.jumlah || 0,
      },

      // Data pelaporan
      pelaporan: {
        mingguIni: pelaporanMingguIni,
        mingguLalu: pelaporanMingguLalu,
        bulanIni: pelaporanBulanIni,
        bulanLalu: pelaporanbulanLalu,
      },
    };
  }

  async hitungPerubahan(sekarang: number, sebelumnya: number) {
    if (!sebelumnya || sebelumnya === 0) return 0;
    return ((sekarang - sebelumnya) / sebelumnya) * 100;
  }
}
