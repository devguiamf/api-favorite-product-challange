import { Module } from '@nestjs/common';
import { CreateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/create-favorite-list';
import { GetFavoriteListByIdUseCase } from 'src/domain/application/use-cases/favorite-list/get-favorite-list-by-userId';
import { DatabaseModule } from '../database/database.module';
import { UpdateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/update-favorite-list';
import { DeleteFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/delete-favorite-list';
import { AuthCustomerUseCase } from 'src/domain/application/use-cases/customer/auth-customer';
import { RegisterCustomerUseCase } from 'src/domain/application/use-cases/customer/register-customer';
import { FavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/favorite-product';
import { UnFavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/unfavorite-product';
import { FavoriteListController } from './controllers/favorite-list.controller';
import { CustomerController } from './controllers/customer.controller';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [FavoriteListController, CustomerController],
  providers: [
    CreateFavoriteListUseCase,
    GetFavoriteListByIdUseCase,
    UpdateFavoriteListUseCase,
    DeleteFavoriteListUseCase,
    AuthCustomerUseCase,
    RegisterCustomerUseCase,
    FavoriteProductUseCase,
    UnFavoriteProductUseCase,
  ],
})
export class HttpModule {}
