import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { MONGO_DB_CONNECTION } from '../mongodb-connection';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { UserRepository } from 'src/domain/application/repositories/user-repository.interface';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { User } from 'src/domain/enterprise/entities/customer';

export type UserDocument = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class MongoDbUserRepository implements UserRepository {
  #userCollection: Collection<UserDocument>;

  constructor(
    @Inject(MONGO_DB_CONNECTION)
    private readonly connection: MongoClient,
  ) {
    this.#userCollection = this.connection.db().collection('user');
  }

  async save(user: User): Promise<void> {
    try {
      await this.#userCollection.insertOne({
        _id: user.id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async existsByEmail(email: Email): Promise<boolean> {
    try {
      const user = await this.#userCollection.findOne({
        email: email.value,
      });

      if (user) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: Email): Promise<User | null> {
    try {
      const user = await this.#userCollection.findOne({
        email: email.value,
      });

      if (!user) {
        return null
      }

      return User.restore(
        {
          email: Email.create(user.email),
          name: user.name,
          password: user.password,
        },
        new UniqueEntityID(user._id),
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(id: UniqueEntityID): Promise<User | null> {
    try {
      const user = await this.#userCollection.findOne({
        _id: id.toValue(),
      });

      if (!user) {
        return null;
      }

      return User.restore(
        {
          email: Email.create(user.email),
          name: user.name,
        },
        new UniqueEntityID(user._id),
      );
    } catch (error: any) {
      throw error;
    }
  }
}
