import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { MONGO_DB_CONNECTION } from '../mongodb-connection';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';
import { Product, ProductProps } from 'src/domain/enterprise/entities/product';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';

export type ProductDocument = {
  _id: string;
  productApiId: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export type FavoriteListDocument = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  products: ProductDocument[];
};

@Injectable()
export class MongoDbFavoriteListRepository implements FavoriteListRepository {
  #favoriteListCollection: Collection<FavoriteListDocument>;
  constructor(
    @Inject(MONGO_DB_CONNECTION)
    private readonly connection: MongoClient,
  ) {
    this.#favoriteListCollection = this.connection
      .db()
      .collection('favorite-list');
  }

  async save(favoriteList: FavoriteList): Promise<void> {
    try {
      await this.#favoriteListCollection.insertOne({
        _id: favoriteList.id.toString(),
        title: favoriteList.title,
        description: favoriteList.description,
        userId: favoriteList.userId.toString(),
        products: []
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: UniqueEntityID): Promise<FavoriteList | null> {
    try {
      let favoriteList = await this.#favoriteListCollection.findOne(
        {
          userId: userId.toValue(),
        },
        {
          projection: {
            _id: 1,
            title: 1,
            description: 1,
            userId: 1,
            products: 1,
          },
        },
      );

      if (!favoriteList) {
        return null
      }

      return FavoriteList.restore(
        {
          title: favoriteList.title,
          description: favoriteList.description,
          userId: favoriteList.userId,
          products: favoriteList.products.map((product) => {
            return Product.restore(
              {
                productApiId: product.productApiId,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
              },
              new UniqueEntityID(product._id),
            );
          }),
        },
        new UniqueEntityID(favoriteList._id),
      );
    } catch (error) {
      throw error;
    }
  }

  async exists(userId: UniqueEntityID): Promise<boolean> {
    try {
      const favoriteList = await this.#favoriteListCollection.findOne(
        {
          userId: userId.toValue(),
        },
        {
          projection: {
            _id: 1,
          },
        },
      );

      if (!favoriteList) return false;

      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(entity: FavoriteList): Promise<void> {
    try {
      await this.#favoriteListCollection.updateOne(
        {
          _id: entity.id.toValue(),
        },
        {
          $set: {
            title: entity.title,
            description: entity.description,
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: UniqueEntityID): Promise<void> {
    try {
      await this.#favoriteListCollection.deleteOne({
        userId: userId.toValue(),
      });
    } catch (error) {
      throw error;
    }
  }

  async favoriteProduct(favoriteList: FavoriteList): Promise<void> {
    try {
      await this.#favoriteListCollection.updateOne(
        {
          _id: favoriteList.id.toValue(),
        },
        {
          $set: {
            products: favoriteList.products.map((product) => {
              return {
                _id: product.id.toValue(),
                productApiId: product.productApiId,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category,
              };
            }),
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async unfavoriteProduct(entity: FavoriteList): Promise<void> {
    try {
      await this.#favoriteListCollection.updateOne(
        {
          _id: entity.id.toValue(),
        },
        {
          $set: {
            products: entity.products.map((product) => {
              return {
                _id: product.id.toValue(),
                productApiId: product.productApiId,
                title: product.title,
                price: product.price,
                image: product.image,
                description: product.description,
                category: product.category,
              };
            }),
          },
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
