import { Test, TestingModule } from '@nestjs/testing';
import { StandarLayananService } from './standar-layanan.service';

describe('StandarLayananService', () => {
  let service: StandarLayananService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StandarLayananService],
    }).compile();

    service = module.get<StandarLayananService>(StandarLayananService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
