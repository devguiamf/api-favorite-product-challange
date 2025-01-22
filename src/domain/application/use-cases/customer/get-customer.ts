import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { CustomerRepository } from '../../repositories/customer-repository.interface';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';

export type GetCustomerRequest = {
  userId: string;
};

export type GetCustomerResponse = Customer;

@Injectable()
export class GetCustomerUseCase
  implements UseCase<GetCustomerRequest, GetCustomerResponse>
{
  constructor(
    private readonly userRepository: CustomerRepository
  ) {}

  async execute(request: GetCustomerRequest): Promise<GetCustomerResponse> {

    const user = await this.userRepository.findById(
      new UniqueEntityID(request.userId),
    );

    if (!user) {
      throw new EntityNotFoundError('Usuário', request.userId);
    }

    return user;
  }
}