import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/types/use-case';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { EntityNotFoundError } from 'src/core/errors/commom/entity-not-found-error';
import { User } from 'src/domain/enterprise/entities/customer';
import { UserRepository } from '../../repositories/user-repository.interface';

export type GetUserRequest = {
  userId: string;
};

export type GetUserResponse = User;

@Injectable()
export class GetUserUseCase
  implements UseCase<GetUserRequest, GetUserResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(
      new UniqueEntityID(request.userId),
    );

    if (!user) {
      throw new EntityNotFoundError('Usuário', request.userId);
    }

    return user;
  }
}
