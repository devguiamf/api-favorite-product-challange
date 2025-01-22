import { Injectable } from '@nestjs/common';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { CustomerRepository } from '../../repositories/customer-repository.interface';
import { CustomerNotFoundError } from './errors/customer-not-found';
import { UseCase } from 'src/core/types/use-case';
import { Hasher } from '../../cryptography/hasher';
import { Encrypter } from '../../cryptography/encrypter';
import { EnvService } from 'src/infra/env/env.service';
import { UserPayload } from 'src/infra/auth/jwt.strategy';

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
  constructor(
    private readonly customerRepo: CustomerRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
    private readonly envService: EnvService
  ) {}

  async execute(request: AuthCustomerRequest): Promise<AuthCustomerResponse> {
    try {
      const customer = await this.customerRepo.findByEmail(request.email);

      if (!customer) {
        throw new CustomerNotFoundError();
      }

      const isPasswordMatch = await this.hasher.compare(request.password, customer.password);

      console.log(isPasswordMatch);
      

      if (!isPasswordMatch) {
        throw new CustomerNotFoundError();
      }

      const authToken = await this.encrypter.encrypt<UserPayload>(
        {
          sub: customer.id.toString(),
        },
        {
          expiresIn: Number(this.envService.get('JWT_EXPIRES_IN')),
        },
      );

      return {
        token: authToken,
        user: customer,
      };
    } catch (error) {
      throw error;
    }
  }
}
