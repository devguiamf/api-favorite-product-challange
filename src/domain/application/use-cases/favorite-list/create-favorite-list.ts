import { Injectable } from '@nestjs/common';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { UseCase } from 'src/core/types/use-case';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';
import { FavoriteListAlreadyExistsError } from './errors/favorite-list-already-exists';

export type CreateFavoriteListRequest = {
  title: string;
  description: string;
  userId: string;
};

export type CreateFavoriteListResponse = FavoriteList;

@Injectable()
export class CreateFavoriteListUseCase
  implements UseCase<CreateFavoriteListRequest, CreateFavoriteListResponse>
{
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(request: CreateFavoriteListRequest): Promise<FavoriteList> {
    try {
      const exists = await this.favoriteListRepo.exists(
        new UniqueEntityID(request.userId),
      );

      if (exists) {
        throw new FavoriteListAlreadyExistsError();
      }

      const favoriteList = FavoriteList.create({
        title: request.title,
        description: request.description,
        userId: request.userId,
      });

      await this.favoriteListRepo.save(favoriteList);

      return favoriteList;
    } catch (error) {
      throw error;
    }
  }
}
