import { Injectable } from '@nestjs/common';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { UseCase } from 'src/core/types/use-case';
import { Hasher } from '../../cryptography/hasher';
import { Encrypter } from '../../cryptography/encrypter';
import { EnvService } from 'src/infra/env/env.service';
import { UserPayload } from 'src/infra/auth/jwt.strategy';
import { User } from 'src/domain/enterprise/entities/user';
import { UserRepository } from '../../repositories/user-repository.interface';
import { UserNotFoundError } from './errors/user-not-found';

export type AuthUserRequest = {
  email: Email;
  password: string;
};

export type AuthUserResponse = {
  token: string;
  user: User;
};

@Injectable()
export class AuthUserUseCase
  implements UseCase<AuthUserRequest, AuthUserResponse>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
    private readonly envService: EnvService,
  ) {}

  async execute(request: AuthUserRequest): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepo.findByEmail(request.email);

      if (!user) {
        throw new UserNotFoundError();
      }

      const isPasswordMatch = await this.hasher.compare(
        request.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new UserNotFoundError();
      }

      const authToken = await this.encrypter.encrypt<UserPayload>(
        {
          sub: user.id.toString(),
        },
        {
          expiresIn: Number(this.envService.get('JWT_EXPIRES_IN')),
        },
      );

      return {
        token: authToken,
        user: user,
      };
    } catch (error) {
      throw error;
    }
  }
}
