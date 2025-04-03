import { Controller, Get, Post } from '@nestjs/common';
import { StatistikService } from './statistik.service';
import { Public } from 'src/auth/PublicDecorator';
import { Throttle } from '@nestjs/throttler';

@Controller('api/statistik')
export class StatistikController {
  constructor(private readonly statistikService: StatistikService) {}

  @Public()
  @Post('catat-pengunjung')
  @Throttle({ default: { limit: 1, ttl: 1000 } })
  create() {
    return this.statistikService.catat();
  }

  @Get()
  async dapatkanStatistik() {
    const statistik = await this.statistikService.dapatkanStatistik();
    const perubahanPengunjung = {
      harian: await this.statistikService.hitungPerubahan(
        statistik.pengunjung.hariIni,
        statistik.pengunjung.kemarin,
      ),
      mingguan: await this.statistikService.hitungPerubahan(
        statistik.pengunjung.mingguIni,
        statistik.pengunjung.mingguLalu,
      ),
    };

    const perubahanPelaporan = {
      mingguan: await this.statistikService.hitungPerubahan(
        statistik.pelaporan.mingguIni,
        statistik.pelaporan.mingguLalu,
      ),
      bulanan: await this.statistikService.hitungPerubahan(
        statistik.pelaporan.bulanIni,
        statistik.pelaporan.bulanLalu,
      ),
    };

    return { ...statistik, perubahanPengunjung, perubahanPelaporan };
  }
}
