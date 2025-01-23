import { Injectable } from '@nestjs/common';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';
import { FavoriteListRepository } from '../../repositories/favorite-list-repository.interface';

export type GetFavoriteListByUserIdRequest = {
  userId: string;
};

export type GetFavoriteListByIdResponse = FavoriteList;

@Injectable()
export class GetFavoriteListByIdUseCase {
  constructor(private readonly favoriteListRepo: FavoriteListRepository) {}

  async execute(
    request: GetFavoriteListByUserIdRequest,
  ): Promise<GetFavoriteListByIdResponse> {
    try {
      const entityId = new UniqueEntityID(request.userId);

      const favoriteList = await this.favoriteListRepo.findById(entityId);

      if (!favoriteList) {
        throw new EntityNotFoundError(
          'FavoriteList',
          request.userId,
          'Lista de favoritos não encontrada para este usuário',
          "Verifique se o id do usuário está correto"
        );
      }

      return favoriteList;
    } catch (error) {
      throw error;
    }
  }
}
