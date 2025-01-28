import { Entity } from 'src/core/entity/entity';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product, ProductProps } from './product';
import { FavoriteListIsFullError } from './errors/favorite-list-is-full.error';
import { ProductAlreadyFavoritedError } from './errors/product-already-favorited-error';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';

export type FavoriteListProps = {
  title: string;
  description?: string;
  userId: string;
  products: Product[];
};

export class FavoriteList extends Entity<FavoriteListProps> {
  favoriteProduct(newProduct: Product, favoritList: FavoriteList) {
    if (favoritList.products.length >= 5) {
      throw new FavoriteListIsFullError(this);
    }

    const productsAlreadyFavorited = this.props.products.some(
      (product) => product.productApiId === newProduct.productApiId,
    );

    if (productsAlreadyFavorited) {
      throw new ProductAlreadyFavoritedError();
    }

    this.props.products.push(newProduct);
  }

  unfavoriteProduct(productApiId: number, productLsit: Product[]) {
    const productExists = productLsit.find(
      (product) => product.productApiId === productApiId,
    );

    if (!productExists) {
      throw new EntityNotFoundError(
        'Product',
        productApiId.toString(),
        'Produto não encontrado',
      );
    }

    const productIndex = productLsit.findIndex(
      (product) => product.productApiId === productApiId,
    );

    productLsit.splice(productIndex, 1);
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get description() {
    return this.props.description ?? '';
  }

  set description(value: string) {
    this.props.description = value;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(value: string) {
    this.props.userId = value;
  }

  get products(): Product[] {
    return this.props.products ?? [];
  }

  set products(value: Product[]) {
    this.props.products = value;
  }

  get ProductPros(): ProductProps[] {
    return this.props.products.map((product) => product.toProps());
  }

  public static create(props: FavoriteListProps) {
    return new FavoriteList(props);
  }

  public static restore(props: FavoriteListProps, id: UniqueEntityID) {
    return new FavoriteList(props, id);
  }
}
