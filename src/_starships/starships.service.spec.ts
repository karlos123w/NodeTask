import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsService } from './starships.service';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

jest.mock('axios');

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipsService],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all starships if pageNumber is not provided', async () => {
      const mockStarships = [
        { id: 1, name: 'Starship 1' },
        { id: 2, name: 'Starship 2' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockStarships },
      });

      const result = await service.findAll(undefined, 10);

      expect(result).toEqual(mockStarships);
    });

    it('should return a pagination starships if pageNumber is provided', async () => {
      const mockStarships = [
        { id: 1, name: 'Starship 1' },
        { id: 2, name: 'Starship 2' },
        { id: 3, name: 'Starship 3' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockStarships },
      });

      const result = await service.findAll(2, 1);

      expect(result).toEqual([{ id: 2, name: 'Starship 2' }]);
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
    it('should return a starship if found', async () => {
      const mockStarship = { id: 1, name: 'Starship 1' };
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockStarship });

      const result = await service.findOne(1);

      expect(result).toEqual(mockStarship);
    });

    it('should throw  BadRequestException if starship is not found', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        Response: { status: 404 },
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
