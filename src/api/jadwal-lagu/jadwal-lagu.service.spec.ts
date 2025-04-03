import { Test, TestingModule } from '@nestjs/testing';
import { JadwalLaguService } from './jadwal-lagu.service';

describe('JadwalLaguService', () => {
  let service: JadwalLaguService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JadwalLaguService],
    }).compile();

    service = module.get<JadwalLaguService>(JadwalLaguService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
