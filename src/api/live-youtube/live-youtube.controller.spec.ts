import { Test, TestingModule } from '@nestjs/testing';
import { LiveYoutubeController } from './live-youtube.controller';
import { LiveYoutubeService } from './live-youtube.service';

describe('LiveYoutubeController', () => {
  let controller: LiveYoutubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiveYoutubeController],
      providers: [LiveYoutubeService],
    }).compile();

    controller = module.get<LiveYoutubeController>(LiveYoutubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
