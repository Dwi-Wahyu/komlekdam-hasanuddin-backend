import { Test, TestingModule } from '@nestjs/testing';
import { GaleriController } from './galeri.controller';
import { GaleriService } from './galeri.service';

describe('GaleriController', () => {
  let controller: GaleriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleriController],
      providers: [GaleriService],
    }).compile();

    controller = module.get<GaleriController>(GaleriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
