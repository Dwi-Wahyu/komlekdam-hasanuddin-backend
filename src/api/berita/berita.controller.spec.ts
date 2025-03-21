import { Test, TestingModule } from '@nestjs/testing';
import { BeritaController } from './berita.controller';
import { BeritaService } from './berita.service';

describe('BeritaController', () => {
  let controller: BeritaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeritaController],
      providers: [BeritaService],
    }).compile();

    controller = module.get<BeritaController>(BeritaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
