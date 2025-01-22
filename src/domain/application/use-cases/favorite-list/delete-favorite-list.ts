import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';

export type DeleteFavoriteListRequest = {
  userId: string;
};

export type DeleteFavoriteListResponse = void;

@Injectable()
export class DeleteFavoriteListUseCase
  implements UseCase<DeleteFavoriteListRequest, DeleteFavoriteListResponse>
{
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(
    request: DeleteFavoriteListRequest,
  ): Promise<DeleteFavoriteListResponse> {
    try {
      const entityId = new UniqueEntityID(request.userId);

      const exists = await this.favoriteListRepo.exists(entityId);

      if (!exists) {
        throw new EntityNotFoundError(
          'FavoriteList',
          request.userId,
          'Usuário não encontrado',
          'Verifique se o id do usuário está correto',
        );
      }

      await this.favoriteListRepo.delete(entityId);
    } catch (error) {
      throw error;
    }
  }
}
