import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product } from 'src/domain/enterprise/entities/product';
import { FavoriteListNotFoundError } from './errors/favorite-list-not-found';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';

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

      favoriteList.favoriteProduct(request.product, favoriteList);

      await this.favoriteListRepo.favoriteProduct(favoriteList.id, favoriteList.products);
    } catch (error) {
      throw error;
    }
  }
}
