import { Test, TestingModule } from '@nestjs/testing';
import { ProgramAcaraController } from './program-acara.controller';
import { ProgramAcaraService } from './program-acara.service';

describe('ProgramAcaraController', () => {
  let controller: ProgramAcaraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramAcaraController],
      providers: [ProgramAcaraService],
    }).compile();

    controller = module.get<ProgramAcaraController>(ProgramAcaraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
