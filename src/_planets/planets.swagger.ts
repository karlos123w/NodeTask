import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllPlanetsSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get all Planets',
      description: 'Get a list of all Planets',
    })(target, key, descriptor);

    ApiQuery({
      name: 'pageNumber',
      type: Number,
      required: false,
      description: 'Page number',
    })(target, key, descriptor);

    ApiQuery({
      name: 'pageSize',
      type: Number,
      required: false,
      description: 'Page Size',
    })(target, key, descriptor);

    ApiResponse({ status: 200, description: 'Planets found successfully' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 403, description: 'Forbidden request' })(
      target,
      key,
      descriptor,
    );
  };
};

export const FindOnePlanetSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get a single planet',
      description: 'Get details for a specific planet',
    })(target, key, descriptor);

    ApiParam({ name: 'planetId', type: Number, description: 'PlanetId' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 200, description: 'Planet found successfully' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 403, description: 'Forbidden.' })(
      target,
      key,
      descriptor,
    );
  };
};
