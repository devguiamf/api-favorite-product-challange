import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';

export type UpdateFavoriteListRequest = {
  userId: string;
  title?: string;
  description?: string;
};

export type UpdateFavoriteListResponse = FavoriteList;

@Injectable()
export class UpdateFavoriteListUseCase
  implements UseCase<UpdateFavoriteListRequest, UpdateFavoriteListResponse>
{
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(request: UpdateFavoriteListRequest): Promise<FavoriteList> {
    try {
      const { userId, ...restOfData } = request;
      const entityId = new UniqueEntityID(userId);

      const exists = await this.favoriteListRepo.exists(entityId);

      if (!exists) {
        throw new EntityNotFoundError('Favorite list', userId);
      }

      const favoriteList = await this.favoriteListRepo.findById(entityId);

      if(!favoriteList) throw new EntityNotFoundError('Favorite list', userId);

      Object.assign(favoriteList, restOfData);

      await this.favoriteListRepo.update(favoriteList);

      return favoriteList;
    } catch (error) {
      throw error;
    }
  }
}
