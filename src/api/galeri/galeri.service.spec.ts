import { Test, TestingModule } from '@nestjs/testing';
import { GaleriService } from './galeri.service';

describe('GaleriService', () => {
  let service: GaleriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleriService],
    }).compile();

    service = module.get<GaleriService>(GaleriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
