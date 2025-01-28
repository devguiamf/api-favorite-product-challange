import { faker } from '@faker-js/faker/.';
import {
  UpdateFavoriteListRequest,
  UpdateFavoriteListUseCase,
} from '../update-favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { mock } from 'jest-mock-extended';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { makeFavoriteList } from '../../../../../../test/mocks/domain/favorite-list.mock';

function makeUpdateFavoriteListRequest(
  modifications?: Partial<UpdateFavoriteListRequest>,
): UpdateFavoriteListRequest {
  return {
    title: faker.lorem.word(),
    description: faker.lorem.sentence(),
    userId: new UniqueEntityID().toValue(),
    ...modifications,
  };
}

describe(`${UpdateFavoriteListUseCase.name}`, () => {
  let sut: UpdateFavoriteListUseCase;
  let favoriteListRepo: jest.Mocked<FavoriteListRepository>;
  let defaultFavoriteList: FavoriteList;

  beforeEach(() => {
    defaultFavoriteList = makeFavoriteList();
    favoriteListRepo = mock<FavoriteListRepository>();
    favoriteListRepo.exists.mockResolvedValue(true);
    favoriteListRepo.findById.mockResolvedValue(defaultFavoriteList);
    sut = new UpdateFavoriteListUseCase(favoriteListRepo);
  });

  it('should updated a valid favorite list', async () => {
    const updateFavoriteListRequest = makeUpdateFavoriteListRequest();

    const response = await sut.execute(updateFavoriteListRequest);

    expect(favoriteListRepo.exists).toHaveBeenCalledWith(
      new UniqueEntityID(updateFavoriteListRequest.userId),
    );
    expect(favoriteListRepo.findById).toHaveBeenCalledWith(
      new UniqueEntityID(updateFavoriteListRequest.userId),
    );
    expect(response).toBeDefined();
    expect(response.title).toBe(updateFavoriteListRequest.title);
    expect(response.description).toBe(updateFavoriteListRequest.description);
  });

  it('should throw an error when the favorite list does not exist', async () => {
    const updateFavoriteListRequest = makeUpdateFavoriteListRequest();
    favoriteListRepo.exists.mockResolvedValueOnce(false);

    await expect(sut.execute(updateFavoriteListRequest)).rejects.toThrow(
      'Recurso não encontrado!',
    );

    expect(favoriteListRepo.exists).toHaveBeenCalled();
  });
});
