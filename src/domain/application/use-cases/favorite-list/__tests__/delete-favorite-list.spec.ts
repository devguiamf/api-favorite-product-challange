import { faker } from '@faker-js/faker/.';
import {
  CreateFavoriteListRequest,
  CreateFavoriteListUseCase,
} from '../create-favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { mock } from 'jest-mock-extended';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import {
  DeleteFavoriteListRequest,
  DeleteFavoriteListUseCase,
} from '../delete-favorite-list';

function makeDeleteFavoriteListRequest(
  modifications?: Partial<DeleteFavoriteListRequest>,
): DeleteFavoriteListRequest {
  return {
    userId: new UniqueEntityID().toValue(),
    ...modifications,
  };
}

describe(DeleteFavoriteListUseCase.name, () => {
  let sut: DeleteFavoriteListUseCase;
  let favoriteListRepo: jest.Mocked<FavoriteListRepository>;

  beforeEach(() => {
    favoriteListRepo = mock<FavoriteListRepository>();
    favoriteListRepo.exists.mockResolvedValue(true);
    sut = new DeleteFavoriteListUseCase(favoriteListRepo);
  });

  it('should delete a favorite list', async () => {
    const createFavoriteListRequest = makeDeleteFavoriteListRequest();
    await sut.execute(createFavoriteListRequest);

    expect(favoriteListRepo.exists).toHaveBeenCalled();
    expect(favoriteListRepo.delete).toHaveBeenCalled();
  });

  it('should throw an error when the list favorite does not exist', async () => {
    const createFavoriteListRequest = makeDeleteFavoriteListRequest();
    favoriteListRepo.exists.mockResolvedValueOnce(false);

    await expect(sut.execute(createFavoriteListRequest)).rejects.toThrow(
      'Lista de favoritos não encontrada',
    );

    expect(favoriteListRepo.exists).toHaveBeenCalled();
  });
});
