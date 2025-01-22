
import { Entity } from 'src/core/entity/entity';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { ProductAlreadyFavoritedError } from './errors/favorite-list-is-full.error';
import { Product } from './product';


export type FavoriteListProps = {
  title: string;
  description?: string;
  userId: string;
  products?: Product[];
};

export class FavoriteList extends Entity<FavoriteListProps> {
  #newFavoritedProducts: Product[] = [];


  favoriteProduct(newProduct: Product, productLsit: Product[]) {
    productLsit.forEach((product) => {
      const productAlreadyFavorited = this.#newFavoritedProducts.some(
        (favoritedProduct) => favoritedProduct.id.equals(newProduct.id),
      );

      if (productAlreadyFavorited) {
        throw new ProductAlreadyFavoritedError(product);
      }

      this.#newFavoritedProducts.push(product);
    });
  }

  unfavoriteProduct(productId: UniqueEntityID, productLsit: Product[]) {
    productLsit.forEach((product) => {
      const productAlreadyFavorited = this.#newFavoritedProducts.some(
        (favoritedProduct) => favoritedProduct.id.equals(productId),
      );

      if (!productAlreadyFavorited) {
        throw new ProductAlreadyFavoritedError(product);
      }

      this.#newFavoritedProducts.push(product);
    });
  }

  set title(value: string) {
    this.props.title = value;
  }

  get title() {
    return this.props.title;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get description() {
    return this.props.description ?? '';
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get userId() {
    return this.props.userId;
  }

  set products(value: Product[]) {
    this.props.products = value;
  }

  get products() {
    return this.props.products ?? [];
  }

  public static create(props: FavoriteListProps) {
    return new FavoriteList(props);
  }

  public static restore(
    props: FavoriteListProps,
    id: UniqueEntityID
  ) {
    return new FavoriteList(props, id);
  }
}
