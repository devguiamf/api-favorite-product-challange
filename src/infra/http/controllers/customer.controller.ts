import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { Public } from 'src/infra/auth/public.decorator';
import { AuthUserUseCase } from 'src/domain/application/use-cases/customer/auth-user';
import { RegisterUserUseCase } from 'src/domain/application/use-cases/customer/register-user';
import { AuthUserSchema, TAuthUserSchema } from './schema/customer/auth-customer.schema';
import { UserHttpResponse, UserPresenter } from './presenters/customer.presenter';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { User } from 'src/domain/enterprise/entities/customer';
import { RegisterUserSchema, TRegisterUserSchema } from './schema/customer/register-customer.schema';

@Public()
@Controller('client')
export class UserController {
  constructor(
    private readonly authUserUseCase: AuthUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('auth')
  async authenticateUser(
    @Body(new ZodValidationPipe(AuthUserSchema))
    body: TAuthUserSchema,
  ): Promise<UserHttpResponse> {
    try {
      const { user, token } = await this.authUserUseCase.execute({
        email: Email.create(body.email),
        password: body.password,
      });

      const userRestore = User.restore(
        {
          name: user.name,
          email: Email.create(user.email),
        },
        user.id,
      );

      return UserPresenter.toHTTP(userRestore, token);
    } catch (error) {
      throw error;
    }
  }

  @Post('register')
  @HttpCode(201)
  async registerUser(
    @Body(new ZodValidationPipe(RegisterUserSchema))
    body: TRegisterUserSchema,
  ): Promise<void> {
    try {
      await this.registerUserUseCase.execute({
        email: Email.create(body.email),
        password: body.password,
        name: body.name,
      });
    } catch (error) {
      throw error;
    }
  }
}
