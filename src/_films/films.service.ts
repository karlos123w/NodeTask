import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilmsService {
  async findAll(pageNumber = 1, pageSize = 10) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?page=${pageNumber}&page_size=${pageSize}`,
      );
      return response.data;
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
