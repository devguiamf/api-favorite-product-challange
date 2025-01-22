import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class CustomerNotFoundError extends BaseError {
  constructor() {
    super({
      message: `Email ou senha inválidos`,
      code: HttpStatus.CONFLICT,
      isClientError: true,
    });
  }
}
