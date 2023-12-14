import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        StarshipsService,
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('findAll', () => {
    it('should return an array of Starships', async () => {
      const mockData = [{ id: 1, name: 'Starship 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockData);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual(mockData);
    });
  });

  describe('findOne', () => {
    it('should return a single starship', async () => {
      const mockData = { id: 1, name: 'Starship' };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockData);
    });
  });
});
