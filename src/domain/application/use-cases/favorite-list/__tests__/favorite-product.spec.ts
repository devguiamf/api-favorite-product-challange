import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import {
  FavoriteProductRequest,
  FavoriteProductUseCase,
} from '../favorite-product';
import { mock } from 'jest-mock-extended';
import {
  makeFavoriteList,
  makeProducts,
} from '../../../../../../test/mocks/domain/favorite-list.mock';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';

function makeFavoriteProductsRequest(
  modifications?: Partial<FavoriteProductRequest>,
): FavoriteProductRequest {
  return {
    userId: new UniqueEntityID().toValue(),
    product: makeProducts(1)[0],
    ...modifications,
  };
}

describe(`${FavoriteProductUseCase.name}`, () => {
  let sut: FavoriteProductUseCase;
  let favoriteListRepo: jest.Mocked<FavoriteListRepository>;
  let defaultFavoriteList: FavoriteList;

  beforeEach(() => {
    defaultFavoriteList = makeFavoriteList();
    defaultFavoriteList.products = makeProducts(3);
    favoriteListRepo = mock<FavoriteListRepository>();
    favoriteListRepo.exists.mockResolvedValue(true);
    favoriteListRepo.findById.mockResolvedValue(defaultFavoriteList);
    sut = new FavoriteProductUseCase(favoriteListRepo);
  });

  it('should favorite a product', async () => {
    const request = makeFavoriteProductsRequest();
    await sut.execute(request);

    expect(favoriteListRepo.exists).toHaveBeenCalledWith(
      new UniqueEntityID(request.userId),
    );
    expect(favoriteListRepo.findById).toHaveBeenCalledWith(
      new UniqueEntityID(request.userId),
    );
    expect(favoriteListRepo.favoriteProduct).toHaveBeenCalled();
  });

  it('should throw an error when the favorite list does not exist', async () => {
    const request = makeFavoriteProductsRequest();
    favoriteListRepo.exists.mockResolvedValueOnce(false);

    await expect(sut.execute(request)).rejects.toThrow(
      'Lista de favoritos não encontrada',
    );

    expect(favoriteListRepo.exists).toHaveBeenCalled;
  });

  it('should throw an error when the product already exists in the favorite list', async () => {
    const products = defaultFavoriteList.products;
    const request = makeFavoriteProductsRequest({ product: products[0] });

    await expect(sut.execute(request)).rejects.toThrow(
      'Este produto já esta na sua lista de favoritado',
    );
  });

  it('should throw an error when the product list is full', async () => {
    const request = makeFavoriteProductsRequest();
    defaultFavoriteList.products = makeProducts(5);
    favoriteListRepo.findById.mockResolvedValue(defaultFavoriteList);

    await expect(sut.execute(request)).rejects.toThrow(
      `Lista de favoritos ${defaultFavoriteList.title} está cheia`,
    );
  });
});
