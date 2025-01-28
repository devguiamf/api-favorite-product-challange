import { faker } from '@faker-js/faker/.';
import {
  CreateFavoriteListRequest,
  CreateFavoriteListUseCase,
} from '../create-favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { mock } from 'jest-mock-extended';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';

function makeCreateFavoriteListRequest(
  modifications?: Partial<CreateFavoriteListRequest>,
): CreateFavoriteListRequest {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    userId: new UniqueEntityID().toValue(),
    ...modifications,
  };
}

describe(CreateFavoriteListUseCase.name, () => {
  let sut: CreateFavoriteListUseCase;
  let favoriteListRepo: jest.Mocked<FavoriteListRepository>;

  beforeEach(() => {
    favoriteListRepo = mock<FavoriteListRepository>();
    sut = new CreateFavoriteListUseCase(favoriteListRepo);
  });

  it('should create a new list favorite', async () => {
    const createFavoriteListRequest = makeCreateFavoriteListRequest();

    favoriteListRepo.exists.mockResolvedValueOnce(false);

    const result = await sut.execute(createFavoriteListRequest);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(FavoriteList);
    expect(result.title).toBe(createFavoriteListRequest.title);
    expect(result.description).toBe(createFavoriteListRequest.description);
    expect(result.userId).toBe(createFavoriteListRequest.userId);
    expect(result.products).toEqual([]);
    expect(favoriteListRepo.save).toHaveBeenCalled();
    expect(favoriteListRepo.exists).toHaveBeenCalled();
  });

  it('should throw an error when the list favorite already exists', async () => {
    const createFavoriteListRequest = makeCreateFavoriteListRequest();

    favoriteListRepo.exists.mockResolvedValueOnce(true);

    await expect(sut.execute(createFavoriteListRequest)).rejects.toThrow(
      'Já existe uma lista de favoritos para este usuário',
    );
  });
});
