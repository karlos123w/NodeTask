import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Test } from '@nestjs/testing';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('findAll', () => {
    it('should return a array of Films', async () => {
      const mockData = [{ id: 1, name: 'Film 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockData);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual(mockData);
    });
  });

  describe('findOne', () => {
    it('should return a single film', async () => {
      const mockData = { id: 1, name: 'Film 1' };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockData);
    });
  });

  describe('findUniqueWordsFromOpeningCrawls', () => {
    it('should return unique words from opening crawls and their frequency', async () => {
      const mockData = {
        it: 3,
        is: 7,
        a: 8,
      };
      jest
        .spyOn(service, 'findUniqueWordsFromOpeningCrawls')
        .mockResolvedValueOnce(mockData);

      const result = await controller.findUniqueWordsFromOpeningCrawls();
      expect(result).toEqual(mockData);
    });
  });

  describe('findMostFrequentName', () => {
    it('should return most frequent name from opening crawls', async () => {
      const mockData = 'Beru whitesun';
      jest
        .spyOn(service, 'findMostFrequentName')
        .mockResolvedValueOnce(mockData);

      const result = await controller.findMostFrequentName();
      expect(result).toEqual(mockData);
    });
  });
});
