import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class CustomerNotFoundError extends BaseError {
  constructor(message?: string) {
    super({
      message: message ?? `Email ou senha inválidos`,
      code: HttpStatus.CONFLICT,
      isClientError: true,
    });
  }
}
