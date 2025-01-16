import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const message = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message;

    response.status(status).json({
      status: false,
      message: message || 'An unexpected error occurred',
      data: null,
    });
  }
}
