import { Test, TestingModule } from '@nestjs/testing';
import { KataSambutanService } from './kata-sambutan.service';

describe('KataSambutanService', () => {
  let service: KataSambutanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KataSambutanService],
    }).compile();

    service = module.get<KataSambutanService>(KataSambutanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
