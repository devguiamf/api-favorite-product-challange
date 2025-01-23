import { Injectable } from '@nestjs/common';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { EmailIsAlreadyExistError } from './errors/email-already-exist';
import { UseCase } from 'src/core/types/use-case';
import { Hasher } from '../../cryptography/hasher';
import { UserRepository } from '../../repositories/user-repository.interface';
import { User } from 'src/domain/enterprise/entities/customer';

export type RegisterUserRequest = {
  email: Email;
  name: string;
  password: string;
};

export type RegisterUserResponse = void;

@Injectable()
export class RegisterUserUseCase
  implements UseCase<RegisterUserRequest, RegisterUserResponse>
{
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    try {
      const user = await this.userRepo.findByEmail(request.email);

      if (user) {
        throw new EmailIsAlreadyExistError();
      }

      const hashPassowrd = await this.hasher.hash(request.password);

      await this.userRepo.save(
        User.create({
          email: request.email,
          name: request.name,
          password: hashPassowrd,
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
