import { Module } from '@nestjs/common';
import { MONGO_DB_CONNECTION_PROVIDER } from './mongodb/mongodb-connection';
import { EnvModule } from 'src/infra/env/env.module';
import { CustomerRepository } from 'src/domain/application/repositories/customer-repository.interface';
import { MongoDbCustomerRepository } from './mongodb/repositories/mongodb-customer-repository';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { MongoDbFavoriteListRepository } from './mongodb/repositories/mongodb-favorite-list-repository';

@Module({
  imports: [EnvModule],
  providers: [
    MONGO_DB_CONNECTION_PROVIDER,
    {
      provide: CustomerRepository,
      useClass: MongoDbCustomerRepository,
    },
    {
      provide: FavoriteListRepository,
      useClass: MongoDbFavoriteListRepository
    }
  ],
  exports: [FavoriteListRepository, CustomerRepository, MONGO_DB_CONNECTION_PROVIDER],
})
export class DatabaseModule {}
