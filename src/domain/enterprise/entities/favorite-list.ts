
import { Entity } from 'src/core/entity/entity';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product, ProductProps } from './product';
import { FavoriteListIsFullError } from './errors/favorite-list-is-full.error';
import { ProductAlreadyFavoritedError } from './errors/product-already-favorited-error';


export type FavoriteListProps = {
  title: string;
  description?: string;
  userId: string;
  products: Product[];
};

export class FavoriteList extends Entity<FavoriteListProps> {
  #newFavoritedProducts: Product[] = [];

  favoriteProduct(newProduct: Product, favoritList: FavoriteList) {

    if(favoritList.products.length >= 5) {
      new FavoriteListIsFullError(this);
    }
    
    if(favoritList.products.length === 0){
      this.props.products.push(newProduct);
    }

    else{
      favoritList.products.forEach((product) => {
        const productAlreadyFavorited = this.props.products.some(
          (favoritedProduct) => favoritedProduct.id.equals(newProduct.id),
        );
  
        if (productAlreadyFavorited) {
          throw new ProductAlreadyFavoritedError(product);
        }
  
        this.props.products.push(product);
      });
    }    
  }

  unfavoriteProduct(productApiId: number, productLsit: Product[]) {
    productLsit.forEach((product) => {
      const productAlreadyFavorited = this.#newFavoritedProducts.some(
        (favoritedProduct) => favoritedProduct.productApiId === productApiId,
      );

      if (!productAlreadyFavorited) {
        throw new ProductAlreadyFavoritedError(product);
      }

      this.#newFavoritedProducts.push(product);

      this.props.products = this.#newFavoritedProducts;
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

  get products(): Product[] {
    return this.props.products ?? [];
  }

  get ProductPros() {
    return this.props;
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
