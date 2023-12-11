import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllFilmsSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get all Films',
      description: 'Get a list of all Films',
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

    ApiResponse({ status: 200, description: 'Films found successfully' })(
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

export const FindOneFilmSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get a single vehicle',
      description: 'Get details for a specific film',
    })(target, key, descriptor);

    ApiParam({ name: 'filmId', type: Number, description: 'FilmId' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 200, description: 'Film found successfully' })(
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
