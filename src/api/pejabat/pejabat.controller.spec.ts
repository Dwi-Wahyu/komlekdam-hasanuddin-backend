import { Test, TestingModule } from '@nestjs/testing';
import { PejabatController } from './pejabat.controller';
import { PejabatService } from './pejabat.service';

describe('PejabatController', () => {
  let controller: PejabatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PejabatController],
      providers: [PejabatService],
    }).compile();

    controller = module.get<PejabatController>(PejabatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
