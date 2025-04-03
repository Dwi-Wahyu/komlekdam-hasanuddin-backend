import { Test, TestingModule } from '@nestjs/testing';
import { LitbangController } from './litbang.controller';
import { LitbangService } from './litbang.service';

describe('LitbangController', () => {
  let controller: LitbangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LitbangController],
      providers: [LitbangService],
    }).compile();

    controller = module.get<LitbangController>(LitbangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
