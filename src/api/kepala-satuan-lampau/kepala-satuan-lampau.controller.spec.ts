import { Test, TestingModule } from '@nestjs/testing';
import { KepalaSatuanLampauController } from './kepala-satuan-lampau.controller';
import { KepalaSatuanLampauService } from './kepala-satuan-lampau.service';

describe('KepalaSatuanLampauController', () => {
  let controller: KepalaSatuanLampauController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KepalaSatuanLampauController],
      providers: [KepalaSatuanLampauService],
    }).compile();

    controller = module.get<KepalaSatuanLampauController>(KepalaSatuanLampauController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
