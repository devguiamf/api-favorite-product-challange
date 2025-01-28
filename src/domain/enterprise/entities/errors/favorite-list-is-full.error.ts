import { BaseError } from 'src/core/errors/base-error';
import { FavoriteList } from '../favorite-list';
import { HttpStatus } from '@nestjs/common';

export class FavoriteListIsFullError extends BaseError {
  constructor(listFavorite: FavoriteList) {
    super({
      message: `Lista de favoritos ${listFavorite.title} está cheia`,
      code: HttpStatus.CONFLICT,
    });
  }
}
