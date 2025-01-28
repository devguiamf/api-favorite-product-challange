import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { GetUserRequest, GetUserUseCase } from '../get-user';
import { UserRepository } from 'src/domain/application/repositories/user-repository.interface';
import { mock } from 'jest-mock-extended';
import { User } from '../../../../../../src/domain/enterprise/entities/user';
import { makeUser } from '../../../../../../test/mocks/domain/user.mock';

function makeGetUserRequest(
  modifications?: Partial<GetUserRequest>,
): GetUserRequest {
    return {
        userId: new UniqueEntityID().toValue(),
        ...modifications
    }
}

describe(`${GetUserUseCase.name}`, () => {

    let sut: GetUserUseCase;
    let userRepo: jest.Mocked<UserRepository>;
    let defaultUser: User;

    beforeEach(() => {
        defaultUser = makeUser();
        userRepo = mock<UserRepository>();
        userRepo.findById.mockResolvedValue(defaultUser);
        sut = new GetUserUseCase(userRepo);
    });

    it('should get a user', async () => {
        const getUserRequest = makeGetUserRequest();
        const response = await sut.execute(getUserRequest);

        expect(response).toBeDefined();
        expect(response).toEqual(defaultUser);
    });

    it('should throw an error when the user does not exist', async () => {
        const getUserRequest = makeGetUserRequest();
        getUserRequest.userId = 'invalid-id';
        userRepo.findById.mockResolvedValueOnce(null);

        await expect(sut.execute(getUserRequest)).rejects.toThrow('Recurso não encontrado!');
    });

});
