import { Test, TestingModule } from '@nestjs/testing';
import { LitbangService } from './litbang.service';

describe('LitbangService', () => {
  let service: LitbangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LitbangService],
    }).compile();

    service = module.get<LitbangService>(LitbangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
