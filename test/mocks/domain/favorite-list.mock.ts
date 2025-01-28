import { faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import {
  FavoriteList,
  FavoriteListProps,
} from 'src/domain/enterprise/entities/favorite-list';
import { Product, ProductProps } from 'src/domain/enterprise/entities/product';

export function makeFavoriteList(
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

export function makeProducts(length: number): Product[] {
  return Array.from({ length }, () => {
    return Product.create({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      image: faker.image.url(),
      category: faker.commerce.department(),
      productApiId: faker.number.int(),
    });
  });
}
