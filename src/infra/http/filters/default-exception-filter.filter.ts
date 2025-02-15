
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from 'src/core/errors/base-error';

export type DefaultResponseError = {
  statusCode: number;
  message: string[];
  details?: string;
  error: string;
};

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const treatedError = this.getResponseErrorFromException(exception);

      return response.status(treatedError.statusCode).send(treatedError);
    }

    if (exception instanceof BaseError) {
      const treatedError = this.getResponseErrorFromBaseError(exception);

      return response.status(treatedError.statusCode).send(treatedError);
    }

    return response.status(500).send({
      statusCode: 500,
      message: ['Internal Server Error'],
      error: 'Internal Server Error',
    });
  }

  private getResponseErrorFromException(
    exception: HttpException,
  ): DefaultResponseError {
    return {
      ...(exception.getResponse() as object),
      error: exception.name,
    } as DefaultResponseError;
  }

  private getResponseErrorFromBaseError(
    exception: BaseError,
  ): DefaultResponseError {
    return {
      statusCode: exception.code,
      message: [exception.message],
      details: exception.details,
      error: exception.name,
    };
  }
}
