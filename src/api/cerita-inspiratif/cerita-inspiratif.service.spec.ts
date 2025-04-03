import { Test, TestingModule } from '@nestjs/testing';
import { CeritaInspiratifService } from './cerita-inspiratif.service';

describe('CeritaInspiratifService', () => {
  let service: CeritaInspiratifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CeritaInspiratifService],
    }).compile();

    service = module.get<CeritaInspiratifService>(CeritaInspiratifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
