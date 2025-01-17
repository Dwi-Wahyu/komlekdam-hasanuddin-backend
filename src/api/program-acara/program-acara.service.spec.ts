import { Test, TestingModule } from '@nestjs/testing';
import { ProgramAcaraService } from './program-acara.service';

describe('ProgramAcaraService', () => {
  let service: ProgramAcaraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramAcaraService],
    }).compile();

    service = module.get<ProgramAcaraService>(ProgramAcaraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
