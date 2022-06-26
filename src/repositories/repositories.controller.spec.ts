import { Test, TestingModule } from '@nestjs/testing';
import { FsService } from 'src/fs/fs.service';
import { RepositoriesController } from 'src/repositories/repositories.controller';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [RepositoriesService, FsService],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
