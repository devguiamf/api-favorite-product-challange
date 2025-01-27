import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteList, FavoriteListProps } from 'src/domain/enterprise/entities/favorite-list';

export function makeFavoriteList (
  modifications: Partial<FavoriteListProps> = {},
): FavoriteList {
  return FavoriteList.create({
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    userId: new UniqueEntityID().toValue(),
    products: [],
    ...modifications,
  });
}
