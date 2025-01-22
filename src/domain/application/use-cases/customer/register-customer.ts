import { Injectable } from '@nestjs/common';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { CustomerRepository } from '../../repositories/customer-repository.interface';
import { EmailIsAlreadyExistError } from './errors/email-already-exist';
import { UseCase } from 'src/core/types/use-case';

export type RegisterCustomerRequest = {
  email: Email;
  name: string;
  password: string;
};

export type RegisterCustomerResponse = void;

@Injectable()
export class RegisterCustomerUseCase implements UseCase<RegisterCustomerRequest, RegisterCustomerResponse> {
  constructor(
    private readonly customerRepo: CustomerRepository
  ) {}

  async execute(
    request: RegisterCustomerRequest,
  ): Promise<RegisterCustomerResponse> {
    try {

      const customer = await this.customerRepo.findByEmail(request.email);

      if (customer) {
        throw new EmailIsAlreadyExistError();
      } 

      const hashPassword = ''

      await this.customerRepo.save(
        Customer.create({
          email: request.email,
          name: request.name,
          password: hashPassword
        })
      );
    } catch (error) {
      throw error;
    }
  }
}
