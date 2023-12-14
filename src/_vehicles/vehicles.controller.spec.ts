import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;
  let cacheManager: { get: jest.Mock; set: jest.Mock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        // Mocked CACHE_MANAGER
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
    cacheManager = module.get('CACHE_MANAGER') as any;
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const mockData = [{ id: 1, name: 'Vehicle 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockData);

      const result = await controller.findAll(1, 10);
      expect(result).toEqual(mockData);
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      const mockData = { id: 1, name: 'Vehicle 1' };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockData);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockData);
    });
  });
});
