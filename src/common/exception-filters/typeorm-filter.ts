import { Catch, ExceptionFilter, ArgumentsHost, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const customResponse = {
      status: 500,
      message: exception.message,
    };
    response.status(customResponse.status).json(customResponse);
  }
}

export const TypeOrmFilterProvider: Provider = {
  provide: APP_FILTER,
  useClass: TypeOrmFilter,
};
