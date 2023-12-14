import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilmsService {
  constructor() {}

  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const size = pageSize ? pageSize : 10;
      const response = await axios.get(`https://swapi.dev/api/films`);
      const films = response.data.results;

      if (!pageNumber) return films;
      else {
        const startIndex = (pageNumber - 1) * size;
        const slicedFilms = films.slice(startIndex, size + startIndex);

        return slicedFilms;
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

    let openingCrawls = '';

    for (const singleFilm of foundAllFilms) {
      openingCrawls = openingCrawls += singleFilm.opening_crawl;
    }

    const peopleResponse = await axios.get(`https://swapi.dev/api/people`);
    const people = peopleResponse.data.results ?? [];
    const wordsArray: string[] = openingCrawls.split(' ');

    const peopleData: { name: string; count: number }[] = [];

    for (const singlePeople of people) {
      let count = 0;
      const firstName = singlePeople.name.split(' ')[0];

      wordsArray.forEach((singleWord) => {
        return singleWord === firstName && count++;
      });

      peopleData.push({ name: singlePeople.name, count: count });
    }

    const sortedByTheMostFrequent = peopleData.sort((a, b) => {
      if (a.count > b.count) return -1;
      return 1;
    });

    return sortedByTheMostFrequent[0].name;
  }
}
