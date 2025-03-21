import { Test, TestingModule } from '@nestjs/testing';
import { MitraController } from './mitra.controller';
import { MitraService } from './mitra.service';

describe('MitraController', () => {
  let controller: MitraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MitraController],
      providers: [MitraService],
    }).compile();

    controller = module.get<MitraController>(MitraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
