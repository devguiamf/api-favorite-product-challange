
import { BaseError } from 'src/core/errors/base-error';
import { Product } from '../product';

export class ProductAlreadyFavoritedError extends BaseError {
  constructor(product: Product) {
    super({
      message: `Produto ${product.title} (${product.id.toString()}) já foi favoritado`,
    });
  }
}
