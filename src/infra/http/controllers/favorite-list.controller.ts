import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { CreateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/create-favorite-list';
import { GetFavoriteListByIdUseCase } from 'src/domain/application/use-cases/favorite-list/get-favorite-list-by-userId';
import { UpdateFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/update-favorite-list';
import { DeleteFavoriteListUseCase } from 'src/domain/application/use-cases/favorite-list/delete-favorite-list';
import { FavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/favorite-product';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Product } from 'src/domain/enterprise/entities/product';
import { UnFavoriteProductUseCase } from 'src/domain/application/use-cases/favorite-list/unfavorite-product';
import {
  FavoriteListHttpResponse,
  FavoriteListPresenter,
} from './presenters/favorite-list.presenter';
import {
  TUpdateFavoriteListSchema,
  UpdateFavoriteListSchema,
} from './schema/favorite-list/update-favorite-list.schema';
import {
  CreateFavoriteListSchema,
  TCreateFavoriteListSchema,
} from './schema/favorite-list/create-favorite-list.schema';
import {
  FavoriteProductSchema,
  TFavoriteProductSchema,
} from './schema/favorite-list/favorite-product.schema';
import {
  TUnFavoriteProductSchema,
  UnFavoriteProductSchema,
} from './schema/favorite-list/unfavorite-product.schema';

@Controller('favorite-list')
export class FavoriteListController {
  constructor(
    private readonly createFavoriteListUseCase: CreateFavoriteListUseCase,
    private readonly GetFavoriteListByIdUseCase: GetFavoriteListByIdUseCase,
    private readonly updateFavoriteListUseCase: UpdateFavoriteListUseCase,
    private readonly deleteCustomerUseCase: DeleteFavoriteListUseCase,
    private readonly favoriteProductUseCase: FavoriteProductUseCase,
    private readonly unfavoriteProductUseCase: UnFavoriteProductUseCase,
  ) {}

  @Get(':id')
  async getFavoriteListById(
    @Param('id') id: string,
  ): Promise<FavoriteListHttpResponse> {
    try {

      const favoriteList = await this.GetFavoriteListByIdUseCase.execute({
        userId: id,
      });

      return FavoriteListPresenter.toHTTP(favoriteList);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':userId')
  @HttpCode(204)
  async updateCustomer(
    @Body(new ZodValidationPipe(UpdateFavoriteListSchema))
    body: TUpdateFavoriteListSchema,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.updateFavoriteListUseCase.execute({
        userId,
        title: body.title,
        description: body.description,
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteCustomer(@Param('userId') userId: string): Promise<void> {
    try {
      await this.deleteCustomerUseCase.execute({
        userId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @HttpCode(204)
  async createFavoriteList(
    @Body(new ZodValidationPipe(CreateFavoriteListSchema))
    body: TCreateFavoriteListSchema,
  ): Promise<void> {
    try {
      await this.createFavoriteListUseCase.execute({
        title: body.title,
        description: body.descritpion,
        userId: body.userId,
      });
    } catch (error) {
      throw error;
    }
  }

  @Post(':userId/favorite-product')
  async favoriteProduct(
    @Body(new ZodValidationPipe(FavoriteProductSchema))
    body: TFavoriteProductSchema,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.favoriteProductUseCase.execute({
        userId: userId,
        product: Product.restore(
          {
            productApiId: body.productApiId,
            title: body.title,
            price: body.price,
            image: body.image,
            category: body.category,
            description: body.description,
          },
          new UniqueEntityID()
        ),
      });
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  @Patch(':userId/unfavorite-product')
  @HttpCode(204)
  async unFavoriteProduct(
    @Body(new ZodValidationPipe(UnFavoriteProductSchema))
    body: TUnFavoriteProductSchema,
    @Param('userId') userId: string,
  ): Promise<void> {
    try {
      await this.unfavoriteProductUseCase.execute({
        userId: userId,
        productId: body.productId,
      });
    } catch (error) {
      throw error;
    }
  }
}
