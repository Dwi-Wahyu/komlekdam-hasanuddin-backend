import { Test, TestingModule } from '@nestjs/testing';
import { KepalaSatuanLampauService } from './kepala-satuan-lampau.service';

describe('KepalaSatuanLampauService', () => {
  let service: KepalaSatuanLampauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KepalaSatuanLampauService],
    }).compile();

    service = module.get<KepalaSatuanLampauService>(KepalaSatuanLampauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
