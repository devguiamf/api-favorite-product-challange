import { FavoriteList } from "src/domain/enterprise/entities/favorite-list";
import { Product } from "src/domain/enterprise/entities/product";


export type FavoriteListHttpResponse = {
  id: string;
  title: string;
  description: string;
  userId: string;
  products: Product[];
};

export class FavoriteListPresenter {
  static toHTTP(favoriteList: FavoriteList): FavoriteListHttpResponse {
    return {
      id: favoriteList.id.toString(),
      title: favoriteList.title,
      description: favoriteList.description,
      userId: favoriteList.userId.toString(),
      products: favoriteList.products,
    };
  }
}
