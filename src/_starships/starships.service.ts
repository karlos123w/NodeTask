import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StarshipsService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const size = pageSize ? pageSize : 10;
      const response = await axios.get(`https://swapi.dev/api/starships`);
      const starships = response.data.results;

      if (!pageNumber) return starships;
      else {
        const startIndex = (pageNumber - 1) * size;
        return starships.slice(startIndex, size + startIndex);
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching films',
      );
    }
  }

  async findOne(starshipId: number) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/starships/${starshipId}/`,
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching starship',
      );
    }
  }
}
