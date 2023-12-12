import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilmsService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const size = pageSize ? pageSize : 10;
      const response = await axios.get(`https://swapi.dev/api/films`);
      const films = response.data.results;

      if (!pageNumber) return films;
      else {
        const startIndex = (pageNumber - 1) * size;
        return films.slice(startIndex, size + startIndex);
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching films',
      );
    }
  }

  async findOne(filmId: number) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/${filmId}/`,
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching film',
      );
    }
  }
  async findUniqueWordsFromOpeningCrawls() {
    const foundAllFilms = await this.findAll(undefined, undefined);
    const words: string[] = [];

    foundAllFilms.forEach((film: any) => {
      const openingCrawlWords = film.opening_crawl
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase()
        .split(' ')
        .filter((word) => word.trim() !== '');

        console.log(openingCrawlWords);
        
      words.push(...openingCrawlWords);
    });

    const wordFrequency: { [key: string]: number } = {};

    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    return wordFrequency;
  }
}
