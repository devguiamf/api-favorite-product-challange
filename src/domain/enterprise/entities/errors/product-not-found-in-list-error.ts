
import { BaseError } from 'src/core/errors/base-error';
import { Product } from '../product';
import { FavoriteList } from '../favorite-list';

export class ProductNotFoundInListFullError extends BaseError {
  constructor(product: Product, listFavorite: FavoriteList) {
    super({
      message: `Produto ${product.title} (${product.id.toString()}) não encontrado na lista de favoritos ${listFavorite.title} (${listFavorite.id.toString()})`,
    });
  }
}
