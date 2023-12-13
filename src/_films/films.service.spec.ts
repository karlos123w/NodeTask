import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const mockCacheManager = {
  set: jest.fn(),
  get: jest.fn(),
};

describe('FilmsService', () => {
  let filmService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        FilmsService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(filmService).toBeDefined();
  });
});
