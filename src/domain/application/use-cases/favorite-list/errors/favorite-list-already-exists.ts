import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class FavoriteListAlreadyExistsError extends BaseError {
  constructor() {
    super({
      message: `Já existe uma lista de favoritos para este usuário`,
      code: HttpStatus.CONFLICT,
      isClientError: true,
    });
  }
}
