import { Module } from '@nestjs/common';
import { MONGO_DB_CONNECTION_PROVIDER } from './mongodb/mongodb-connection';
import { EnvModule } from 'src/infra/env/env.module';
import { UserRepository } from 'src/domain/application/repositories/user-repository.interface';
import { MongoDbUserRepository } from './mongodb/repositories/mongodb-user-repository';
import { FavoriteListRepository } from 'src/domain/application/repositories/favorite-list-repository.interface';
import { MongoDbFavoriteListRepository } from './mongodb/repositories/mongodb-favorite-list-repository';

@Module({
  imports: [EnvModule],
  providers: [
    MONGO_DB_CONNECTION_PROVIDER,
    {
      provide: UserRepository,
      useClass: MongoDbUserRepository,
    },
    {
      provide: FavoriteListRepository,
      useClass: MongoDbFavoriteListRepository,
    },
  ],
  exports: [
    FavoriteListRepository,
    UserRepository,
    MONGO_DB_CONNECTION_PROVIDER,
  ],
})
export class DatabaseModule {}
