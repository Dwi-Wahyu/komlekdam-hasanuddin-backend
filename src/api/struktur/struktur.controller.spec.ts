import { Test, TestingModule } from '@nestjs/testing';
import { StrukturController } from './struktur.controller';
import { StrukturService } from './struktur.service';

describe('StrukturController', () => {
  let controller: StrukturController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrukturController],
      providers: [StrukturService],
    }).compile();

    controller = module.get<StrukturController>(StrukturController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
