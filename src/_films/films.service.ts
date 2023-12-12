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
      words.push(...openingCrawlWords);
    });

    const wordFrequency: { [key: string]: number } = {};

    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    return wordFrequency;
  }

  async findPeopleName(name: string): Promise<any[]> {
    try {
      const response = await axios.get(`https://swapi.dev/api/people`);
      const people = response.data.results.filter((person: any) =>
        person.name.toLowerCase().includes(name.toLowerCase()),
      );
      return people;
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching Peoples',
      );
    }
  }

  async findMostFrequentName() {
    const foundAllFilms = await this.findAll(undefined, undefined);
    const words: string[] = [];

    foundAllFilms.forEach((film: any) => {
      const openingCrawlWords = film.opening_crawl
        .replace(/[^a-zA-Z ]/g, '')
        .toLowerCase()
        .split(' ')
        .filter((word) => word.trim() !== '');
      words.push(...openingCrawlWords);
      console.log(openingCrawlWords);
    });

    const characterCounts = new Map<string, number>();

    for (const word of words) {
      const matchingCharacters = await this.findPeopleName(word);

      matchingCharacters.forEach((character) => {
        const characterName = character.name;
        const count = characterCounts.get(characterName) || 0;
        characterCounts.set(characterName, count + 1);
      });

      const maxCount = Math.max(...characterCounts.values());
      const mostFrequentCharacters = Array.from(characterCounts.entries())
        .filter(([_, count]) => count === maxCount)
        .map(([characterName]) => characterName);

      return mostFrequentCharacters.length > 0 ? mostFrequentCharacters : null;
    }
  }
}
