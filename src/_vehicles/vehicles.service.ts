import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VehiclesService {
  async findAll(pageNumber: number | undefined, pageSize: number | undefined) {
    try {
      const size = pageSize ? pageSize : 10;
      const response = await axios.get(`https://swapi.dev/api/vehicles`);
      const vehicles = response.data.results;

      if (!pageNumber) return vehicles;
      else {
        const startIndex = (pageNumber - 1) * size;
        return vehicles.slice(startIndex, size + startIndex);
      }
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong during fetching vehicles',
      );
    }
  }

  async findOne(vehicleId: number) {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/vehicles/${vehicleId}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Something went wrong during fetching film',
      );
    }
  }
}
