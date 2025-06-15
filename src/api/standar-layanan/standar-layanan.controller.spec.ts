import { Test, TestingModule } from '@nestjs/testing';
import { StandarLayananController } from './standar-layanan.controller';
import { StandarLayananService } from './standar-layanan.service';

describe('StandarLayananController', () => {
  let controller: StandarLayananController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StandarLayananController],
      providers: [StandarLayananService],
    }).compile();

    controller = module.get<StandarLayananController>(StandarLayananController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
