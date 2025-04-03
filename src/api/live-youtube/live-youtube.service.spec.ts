import { Test, TestingModule } from '@nestjs/testing';
import { LiveYoutubeService } from './live-youtube.service';

describe('LiveYoutubeService', () => {
  let service: LiveYoutubeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiveYoutubeService],
    }).compile();

    service = module.get<LiveYoutubeService>(LiveYoutubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
