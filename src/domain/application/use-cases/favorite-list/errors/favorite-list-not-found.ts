import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class FavoriteListNotFoundError extends BaseError {
  constructor() {
    super({
      message: `Lista de favoritos não encontrada`,
      code: HttpStatus.CONFLICT,
      isClientError: true,
    });
  }
}
