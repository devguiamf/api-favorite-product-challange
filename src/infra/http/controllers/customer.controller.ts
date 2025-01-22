import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { AuthCustomerUseCase } from 'src/domain/application/use-cases/customer/auth-customer';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { RegisterCustomerUseCase } from 'src/domain/application/use-cases/customer/register-customer';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { RegisterCustomerSchema, TRegisterCustomerSchema } from './schema/customer/register-customer.schema';
import { AuthCustomerSchema, TAuthCustomerSchema } from './schema/customer/auth-customer.schema';
import { CustomerHttpResponse, CustomerPresenter } from './presenters/customer.presenter';

@Controller('client')
export class CustomerController {
  constructor(
    private readonly authCustomerUseCase: AuthCustomerUseCase,
    private readonly registerCustomerUseCase: RegisterCustomerUseCase
  ) {}

  @Post('auth')
  @HttpCode(204)
  async authenticateCustomer(
    @Body(new ZodValidationPipe(AuthCustomerSchema))
    body: TAuthCustomerSchema,
  ): Promise<CustomerHttpResponse> {
    try {
      const customer = await this.authCustomerUseCase.execute({
        email: Email.create(body.email),
        password: body.password,
      });

      const customerRestore = Customer.restore({
        name: customer.user.name,
        email: Email.create(customer.user.email),
      }, customer.user.id);

      const token = 'token';
      
      return CustomerPresenter.toHTTP(customerRestore, token);
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  @HttpCode(204)
  async registerCustomer(
    @Body(new ZodValidationPipe(RegisterCustomerSchema))
    body: TRegisterCustomerSchema,
  ): Promise<void> {
    try {
      await this.registerCustomerUseCase.execute({
        email: Email.create(body.email),
        password: body.password,
        name: body.name,
      });
    } catch (error) {
      throw error;
    }
  }
}
