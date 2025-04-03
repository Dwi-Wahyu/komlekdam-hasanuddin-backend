import { Test, TestingModule } from '@nestjs/testing';
import { JadwalLaguController } from './jadwal-lagu.controller';
import { JadwalLaguService } from './jadwal-lagu.service';

describe('JadwalLaguController', () => {
  let controller: JadwalLaguController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JadwalLaguController],
      providers: [JadwalLaguService],
    }).compile();

    controller = module.get<JadwalLaguController>(JadwalLaguController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
