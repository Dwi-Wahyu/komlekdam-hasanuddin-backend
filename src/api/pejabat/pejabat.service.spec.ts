import { Test, TestingModule } from '@nestjs/testing';
import { PejabatService } from './pejabat.service';

describe('PejabatService', () => {
  let service: PejabatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PejabatService],
    }).compile();

    service = module.get<PejabatService>(PejabatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
