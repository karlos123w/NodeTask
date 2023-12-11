import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PlanetsService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const size = pageSize ? pageSize : 10;
      const response = await axios.get(`https://swapi.dev/api/planets`);
      const planets = response.data.results;

      if (!pageNumber) return planets;
    //   if (pageSize === undefined && pageNumber > 1) return planets;
    
      else {
        const startIndex = (pageNumber - 1) * size;
        return planets.slice(startIndex, size + startIndex);
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching planets',
      );
    }
  }

  async findOne(planetId: number) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/planets/${planetId}/`,
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fethcing planet',
      );
    }
  }
}
