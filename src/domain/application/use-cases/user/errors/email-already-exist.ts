import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class EmailIsAlreadyExistError extends BaseError {
  constructor() {
    super({
      message: `Email ja cadastrado`,
      details: `Este Email ja esta cadastrado em nossa base de dados`,
      code: HttpStatus.CONFLICT,
      isClientError: true,
    });
  }
}
