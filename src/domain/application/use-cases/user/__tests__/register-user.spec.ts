import { faker } from '@faker-js/faker/.';
import { RegisterUserRequest, RegisterUserUseCase } from '../register-user';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { MongoDbUserRepository } from 'src/infra/database/mongodb/repositories/mongodb-user-repository';
import { EmailIsAlreadyExistError } from '../errors/email-already-exist';
import { mock } from 'jest-mock-extended';
import { Hasher } from 'src/domain/application/cryptography/hasher';
import { _ } from '@faker-js/faker/dist/airline-D6ksJFwG';
import { User } from 'src/domain/enterprise/entities/user';

function makeCreateUserRequest(
  modifications?: Partial<RegisterUserRequest>,
): RegisterUserRequest {
  return {
    email: Email.create(faker.internet.email()),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...modifications,
  };
}

describe(`${RegisterUserUseCase.name}`, () => {
  let userRepo: jest.Mocked<MongoDbUserRepository>;
  let sut: RegisterUserUseCase;
  let hasher: jest.Mocked<Hasher>;

  beforeEach(async () => {
    userRepo = mock<MongoDbUserRepository>();
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.save.mockResolvedValue();
    userRepo.existsByEmail.mockResolvedValue(false);

    hasher = mock<Hasher>();

    sut = new RegisterUserUseCase(userRepo, hasher);
  });

  it('should register a new user successfully', async () => {

    const registerUserRequest = makeCreateUserRequest();
    await sut.execute(registerUserRequest);

    const user = User.create({
      email: registerUserRequest.email,
      name: registerUserRequest.name,
      password: registerUserRequest.password,
    })

    userRepo.findByEmail.mockResolvedValueOnce(user);

    const userFound = await userRepo.findByEmail(registerUserRequest.email);
    expect(userFound).toBeDefined();
    expect(userFound?.email).toEqual(registerUserRequest.email.value);
    expect(userFound?.name).toEqual(registerUserRequest.name);
    expect(hasher.hash).toHaveBeenCalledWith(registerUserRequest.password);
  });

  it('should throw an error when the email is already in use', async () => {
    userRepo.existsByEmail.mockResolvedValueOnce(true);

    const registerUserRequest = makeCreateUserRequest();

    await expect(sut.execute(registerUserRequest)).rejects.toThrow('Email ja cadastrado');
  });
});
