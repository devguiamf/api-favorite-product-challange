import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import {
  UnFavoriteProductRequest,
  UnFavoriteProductUseCase,
} from '../unfavorite-product';
import { faker } from '@faker-js/faker/.';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { makeFavoriteList, makeProducts } from '../../../../../../test/mocks/domain/favorite-list.mock';
import { mock } from 'jest-mock-extended';

function makeUnfavoriteProductRequest(
  modifications?: Partial<UnFavoriteProductRequest>,
): UnFavoriteProductRequest {
  return {
    productId: faker.number.int(),
    userId: new UniqueEntityID().toValue(),
    ...modifications,
  };
}

describe(`${UnFavoriteProductUseCase.name}`, () => {
    let sut: UnFavoriteProductUseCase;
    let favoriteListRepo: jest.Mocked<FavoriteListRepository>;
    let defaultFavoriteList: FavoriteList;
    
    beforeEach(() => {
        defaultFavoriteList = makeFavoriteList();
        defaultFavoriteList.products = makeProducts(3);
        favoriteListRepo = mock<FavoriteListRepository>();
        favoriteListRepo.exists.mockResolvedValue(true);
        favoriteListRepo.findById.mockResolvedValue(defaultFavoriteList);
        sut = new UnFavoriteProductUseCase(favoriteListRepo);
    });
    
    it('should unfavorite a product', async () => {
        const request = makeUnfavoriteProductRequest();
        request.productId = defaultFavoriteList.products[0].productApiId;
        
        await sut.execute(request);
    
        expect(favoriteListRepo.exists).toHaveBeenCalledWith(
        new UniqueEntityID(request.userId),
        );

        expect(favoriteListRepo.findById).toHaveBeenCalledWith(
        new UniqueEntityID(request.userId),
        );

        expect(favoriteListRepo.unfavoriteProduct).toHaveBeenCalled();
    });
    
    it('should throw an error when the favorite list does not exist', async () => {
        const request = makeUnfavoriteProductRequest();
        favoriteListRepo.exists.mockResolvedValueOnce(false);
    
        await expect(sut.execute(request)).rejects.toThrow(
        'Lista de favoritos não encontrada',
        );
    
        expect(favoriteListRepo.exists).toHaveBeenCalled;
    });
});
