import { Injectable } from '@nestjs/common';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { CustomerRepository } from '../../repositories/customer-repository.interface';
import { CustomerNotFoundError } from './errors/customer-not-found';
import { UseCase } from 'src/core/types/use-case';


export type AuthCustomerRequest = {
  email: Email;
  password: string;
};

export type AuthCustomerResponse = {
  token: string;
  user: Customer;
};

@Injectable()
export class AuthCustomerUseCase implements UseCase<AuthCustomerRequest, AuthCustomerResponse>{
  constructor(private readonly customerRepo: CustomerRepository) {}

  async execute(request: AuthCustomerRequest): Promise<AuthCustomerResponse> {
    try {
      const customer = await this.customerRepo.findByEmail(request.email);

      if (!customer) {
        throw new CustomerNotFoundError();
      }

      return {
        token: 'token',
        user: customer,
      };
    } catch (error) {
      throw error;
    }
  }
}
