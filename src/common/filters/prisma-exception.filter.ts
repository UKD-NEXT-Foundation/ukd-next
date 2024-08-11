import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library.js';

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: PrismaClientKnownRequestError | PrismaClientValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof PrismaClientKnownRequestError ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;

    response.fullError = exception.message;

    response.status(status).json({
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: exception.message.split('\n').pop(),
    });
  }
}
