import { Module } from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { LaporanController } from './laporan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioModule } from 'nestjs-twilio';

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILLIO_SID,
      authToken: process.env.TWILLIO_TOKEN,
    }),
  ],
  controllers: [LaporanController],
  providers: [LaporanService, PrismaService],
})
export class LaporanModule {}
