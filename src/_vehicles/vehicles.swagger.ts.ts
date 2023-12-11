import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export const FindAllSwagger = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get all vehicles',
      description: 'Get a list of all vehicles',
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

    ApiResponse({ status: 200, description: 'Vehicles found successfully' })(
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

export const FindOne = () => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    ApiOperation({
      summary: 'Get a single vehicle',
      description: 'Get details for a specific film',
    })(target, key, descriptor);

    ApiParam({ name: 'vehicleId', type: Number, description: 'VehicleId' })(
      target,
      key,
      descriptor,
    );
    ApiResponse({ status: 200, description: 'Vehicle found successfully' })(
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
