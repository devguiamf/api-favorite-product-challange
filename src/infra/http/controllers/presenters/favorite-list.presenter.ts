import { FavoriteList } from "src/domain/enterprise/entities/favorite-list";
import { Product } from "src/domain/enterprise/entities/product";


export type FavoriteListHttpResponse = {
  id: string;
  title: string;
  description: string;
  userId: string;
  products: {
    title: string;
    price: number;
    image: string;
    productApiId: number;
  }[];
};

export class FavoriteListPresenter {
  static toHTTP(favoriteList: FavoriteList): FavoriteListHttpResponse {
    return {
      id: favoriteList.id.toString(),
      title: favoriteList.title,
      description: favoriteList.description,
      userId: favoriteList.userId.toString(),
      products: favoriteList.products.map((product) => {
        return {
          title: product.title,
          price: product.price,
          image: product.image,
          productApiId: product.productApiId
        };
      })
    };   
  }
}
