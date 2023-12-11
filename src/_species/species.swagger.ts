import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllSpeciesSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get all Species',
      description: 'Get a list of all Species',
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

    ApiResponse({
      status: 200,
      description: 'List of Species found successfully',
    })(target, key, descriptor);
    ApiResponse({ status: 403, description: 'Forbidden request' })(
      target,
      key,
      descriptor,
    );
  };
};

export const FindOneSpeciesSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get a single species',
      description: 'Get details for a specific species',
    })(target, key, descriptor);

    ApiParam({ name: 'speciesId', type: Number, description: 'SpeciesId' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 200, description: 'Species found successfully' })(
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
