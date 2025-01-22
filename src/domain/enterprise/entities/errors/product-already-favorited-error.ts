
import { BaseError } from 'src/core/errors/base-error';
import { FavoriteList } from '../favorite-list';

export class FavoriteListIsFullError extends BaseError {
  constructor(listFavorite: FavoriteList) {
    super({
      message: `Lista de favoritos ${listFavorite.title} (${listFavorite.id.toString()}) está cheia`,
    });
  }
}
