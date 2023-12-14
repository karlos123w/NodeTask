import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

jest.mock('axios');

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all vehicles if pageNumber is not provided', async () => {
      const mockVehicles = [
        { id: 1, name: 'Vehicle 1' },
        { id: 2, name: 'Vehicle 2' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockVehicles },
      });

      const result = await service.findAll(undefined, 10);

      expect(result).toEqual(mockVehicles);
    });

    it('should return paginated vehicles if pageNumber is provided', async () => {
      const mockVehicles = [
        { id: 1, name: 'Vehicle 1' },
        { id: 2, name: 'Vehicle 2' },
        { id: 3, name: 'Vehicle 3' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockVehicles },
      });

      const result = await service.findAll(2, 1);

      expect(result).toEqual([{ id: 2, name: 'Vehicle 2' }]);
    });

    it('should throw BadRequestException on error', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error'),
      );

      await expect(service.findAll(1, 10)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a vehicle if found', async () => {
      const mockVehicle = { id: 1, name: 'Vehicle 1' };
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockVehicle });

      const result = await service.findOne(1);

      expect(result).toEqual(mockVehicle);
    });

    it('should throw BadRequestException if vehicle is not found', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: { status: 404 },
      });

      await expect(service.findOne(1)).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should throw BadRequestException on error', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error'),
      );

      await expect(service.findOne(1)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
