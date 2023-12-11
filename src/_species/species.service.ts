import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpeciesService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const response = await axios.get('https://swapi.dev/api/species');
      const species = response.data.results;

      if (!pageNumber) return species;
      else {
        const startIndex = (pageNumber - 1) * pageSize;
        return species.slice(startIndex, pageSize + startIndex);
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching species',
      );
    }
  }

  async findOne(speciesId: number) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/species/${speciesId}`,
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(
        `Something went wrong during fetching one species`,
      );
    }
  }
}
