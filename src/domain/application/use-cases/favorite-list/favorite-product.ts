import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product } from 'src/domain/enterprise/entities/product';
import { FavoriteListNotFoundError } from './errors/favorite-list-not-found';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';
import { FavoriteListIsFullError } from 'src/domain/enterprise/entities/errors/favorite-list-is-full.error';
import { ProductAlreadyFavoritedError } from 'src/domain/enterprise/entities/errors/product-already-favorited-error';

export type FavoriteProductRequest = {
  userId: string;
  product: Product;
};

export type FavoriteProductResponse = void;

@Injectable()
export class FavoriteProductUseCase
  implements UseCase<FavoriteProductRequest, FavoriteProductResponse>
{
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(request: FavoriteProductRequest): Promise<void> {
    try {
      const exists = await this.favoriteListRepo.exists(
        new UniqueEntityID(request.userId),
      );

      if (!exists) {
        throw new FavoriteListNotFoundError();
      }

      const favoriteList = await this.favoriteListRepo.findById(
        new UniqueEntityID(request.userId),
      );

      if(!favoriteList) throw new FavoriteListNotFoundError();

      if(favoriteList.products.length >=5){
        throw new FavoriteListIsFullError(favoriteList);
      }

      const productExists = favoriteList.products.find(
        (product) => product.productApiId === request.product.productApiId,
      );

      if (productExists) {
        throw new ProductAlreadyFavoritedError();
      }

      favoriteList.favoriteProduct(request.product, favoriteList);

      await this.favoriteListRepo.favoriteProduct(favoriteList);
    } catch (error) {
      throw error;
    }
  }
}
