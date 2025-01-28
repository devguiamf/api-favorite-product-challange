import { BaseError } from 'src/core/errors/base-error';
import { Product } from '../product';
import { FavoriteList } from '../favorite-list';

export class ProductNotFoundInListFullError extends BaseError {
  constructor() {
    super({
      message: `Produto não encontrado na lista de favoritos`,
      code: 404,
    });
  }
}
