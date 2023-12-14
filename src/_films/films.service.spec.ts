import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';

jest.mock('axios');

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all films if pageNumber is not provided', async () => {
      const mockFilms = [
        { id: 1, name: 'Films 1' },
        { id: 2, name: 'Films 2' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockFilms },
      });

      const result = await service.findAll(undefined, 10);

      expect(result).toEqual(mockFilms);
    });

    it('should return a pagination films if pageNumber is provided', async () => {
      const mockFilms = [
        { id: 1, name: 'Film 1' },
        { id: 2, name: 'Film 2' },
        { id: 3, name: 'Film 3' },
      ];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: { results: mockFilms },
      });

      const result = await service.findAll(3, 1);

      expect(result).toEqual([{ id: 3, name: 'Film 3' }]);
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
    it('should return a film if found', async () => {
      const mockFilm = { id: 1, name: 'Film 1' };
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockFilm });

      const result = await service.findOne(1);
      expect(result).toEqual(mockFilm);
    });

    it('should throw BadRequestException if film is not found', async () => {
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

  describe('findUniqueWordsFromOpeningCrawls', () => {
    it('should return unique words from opening crawls and their frequency if found', async () => {
      const findAllMock = jest.spyOn(service, 'findAll');

      const mockFilms = [
        { opening_crawl: 'First film opening crawl' },
        { opening_crawl: 'Second film opening crawl' },
      ];

      findAllMock.mockResolvedValueOnce(mockFilms);
      const result = await service.findUniqueWordsFromOpeningCrawls();
      expect(result).toEqual({
        first: 1,
        film: 2,
        opening: 2,
        crawl: 2,
        second: 1,
      });
      expect(findAllMock).toHaveBeenCalledWith(undefined, undefined);
      expect(findAllMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('findMostFrequentName', () => {
    it('should return most frequent name from opening crawls if found', async () => {
      const findAllMock = jest.spyOn(service, 'findAll');
      const mockFilms = [
        { opening_crawl: 'First film opening crawl' },
        { opening_crawl: 'Second film opening crawl' },
        { opening_crawl: 'Third film opening crawl' },
      ];
      findAllMock.mockResolvedValueOnce(mockFilms);

      const axiosGetMock = jest.spyOn(axios, 'get');
      const mockPeople = {
        data: {
          results: [
            { name: 'Luke Skywalker' },
            { name: 'Leia Organa' },
            { name: 'Han Solo' },
          ],
        },
      };
      axiosGetMock.mockResolvedValueOnce(mockPeople);

      const result = await service.findMostFrequentName();

      expect(result).toEqual('Luke Skywalker');
    });
  });
});
