import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilmsService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const response = await axios.get(`https://swapi.dev/api/films`);
      const films = response.data.results;

      if (!pageNumber) return films;
      else {
        const startIndex = (pageNumber - 1) * pageSize;
        return films.slice(startIndex, pageSize + startIndex);
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
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching film',
      );
    }
  }
}
