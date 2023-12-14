import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllStarsipsSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get all starships',
      description: 'Get a list of all starships',
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

    ApiResponse({ status: 200, description: 'Starships found successfully' })(
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

export const FindOneStarshipSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get a single starship',
      description: 'Get details for a specific starship',
    })(target, key, descriptor);

    ApiParam({ name: 'starshipId', type: Number, description: 'starShipId' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 200, description: 'Starship found successfully' })(
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
