import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import {
  GetFavoriteListByIdUseCase,
  GetFavoriteListByUserIdRequest,
} from '../get-favorite-list-by-userId';
import { UpdateFavoriteListUseCase } from '../update-favorite-list';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import mock from 'jest-mock-extended/lib/Mock';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import {
  makeFavoriteList,
  makeProducts,
} from '../../../../../../test/mocks/domain/favorite-list.mock';

function makeGetFavoriteListByUserIdRequest(
  modifications?: Partial<GetFavoriteListByUserIdRequest>,
): GetFavoriteListByUserIdRequest {
  return {
    userId: new UniqueEntityID().toValue(),
    ...modifications,
  };
}
describe(`${UpdateFavoriteListUseCase.name}`, () => {
  let sut: GetFavoriteListByIdUseCase;
  let favoriteListRepo: jest.Mocked<FavoriteListRepository>;
  let defaultFavoriteList: FavoriteList;

  beforeEach(() => {
    defaultFavoriteList = makeFavoriteList();
    defaultFavoriteList.products = makeProducts(3);
    favoriteListRepo = mock<FavoriteListRepository>();
    favoriteListRepo.exists.mockResolvedValue(true);
    favoriteListRepo.findById.mockResolvedValue(defaultFavoriteList);
    sut = new GetFavoriteListByIdUseCase(favoriteListRepo);
  });

  it('should get a valid favorite list', async () => {
    const getFavoriteListByUserIdRequest = makeGetFavoriteListByUserIdRequest();

    const response = await sut.execute(getFavoriteListByUserIdRequest);

    expect(response).toBeDefined();
    expect(response).toBeInstanceOf(FavoriteList);
    expect(response.title).toBe(defaultFavoriteList.title);
    expect(response.description).toBe(defaultFavoriteList.description);
    expect(response.userId).toBe(defaultFavoriteList.userId);
    expect(favoriteListRepo.findById).toHaveBeenCalledWith(
      new UniqueEntityID(getFavoriteListByUserIdRequest.userId),
    );
    expect(response.products).toHaveLength(3);
  });

  it('should throw an error when the favorite list does not exist', async () => {
    const getFavoriteListByUserIdRequest = makeGetFavoriteListByUserIdRequest();
    favoriteListRepo.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(getFavoriteListByUserIdRequest)).rejects.toThrow(
      'Lista de favoritos não encontrada para este usuário',
    );
    expect(favoriteListRepo.findById).toHaveBeenCalledWith(
      new UniqueEntityID(getFavoriteListByUserIdRequest.userId),
    );
  });
});
