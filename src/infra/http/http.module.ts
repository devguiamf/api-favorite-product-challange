import { Module } from '@nestjs/common';
import { CreateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/create-favorite-list';
import { GetFavoriteListByIdUseCase } from 'src/domain/application/use-cases/favorite-list/get-favorite-list-by-userId';
import { DatabaseModule } from '../database/database.module';
import { UpdateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/update-favorite-list';
import { DeleteFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/delete-favorite-list';
import { FavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/favorite-product';
import { UnFavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/unfavorite-product';
import { FavoriteListController } from './controllers/favorite-list.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { UserController } from './controllers/user.controller';
import { AuthUserUseCase } from 'src/domain/application/use-cases/user/auth-user';
import { RegisterUserUseCase } from 'src/domain/application/use-cases/user/register-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [FavoriteListController, UserController],
  providers: [
    CreateFavoriteListUseCase,
    GetFavoriteListByIdUseCase,
    UpdateFavoriteListUseCase,
    DeleteFavoriteListUseCase,
    FavoriteProductUseCase,
    UnFavoriteProductUseCase,

    AuthUserUseCase,
    RegisterUserUseCase,
  ],
})
export class HttpModule {}
