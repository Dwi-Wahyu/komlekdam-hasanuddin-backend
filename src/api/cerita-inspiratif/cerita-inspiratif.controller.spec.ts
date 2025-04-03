import { Test, TestingModule } from '@nestjs/testing';
import { CeritaInspiratifController } from './cerita-inspiratif.controller';
import { CeritaInspiratifService } from './cerita-inspiratif.service';

describe('CeritaInspiratifController', () => {
  let controller: CeritaInspiratifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CeritaInspiratifController],
      providers: [CeritaInspiratifService],
    }).compile();

    controller = module.get<CeritaInspiratifController>(CeritaInspiratifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
