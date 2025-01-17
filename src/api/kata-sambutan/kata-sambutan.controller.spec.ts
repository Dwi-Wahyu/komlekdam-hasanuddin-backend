import { Test, TestingModule } from '@nestjs/testing';
import { KataSambutanController } from './kata-sambutan.controller';
import { KataSambutanService } from './kata-sambutan.service';

describe('KataSambutanController', () => {
  let controller: KataSambutanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KataSambutanController],
      providers: [KataSambutanService],
    }).compile();

    controller = module.get<KataSambutanController>(KataSambutanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
