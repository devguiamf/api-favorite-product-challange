
import { HttpStatus } from '@nestjs/common';
import { BaseError } from 'src/core/errors/base-error';

export class ProductAlreadyFavoritedError extends BaseError {
  constructor() {
    super({
      message: `Este produto já esta na sua lista de favoritado`,
      code: HttpStatus.CONFLICT,
    });
  }
}
