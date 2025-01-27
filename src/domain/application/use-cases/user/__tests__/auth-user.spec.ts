import { Email } from 'src/domain/enterprise/entities/value-objects/email';
import { AuthUserRequest, AuthUserUseCase } from '../auth-user';
import { faker } from '@faker-js/faker/.';
import { MongoDbUserRepository } from 'src/infra/database/mongodb/repositories/mongodb-user-repository';
import { Hasher } from 'src/domain/application/cryptography/hasher';
import { Encrypter } from 'src/domain/application/cryptography/encrypter';
import { EnvService } from 'src/infra/env/env.service';
import { mock } from 'jest-mock-extended';
import { User } from 'src/domain/enterprise/entities/user';


function makeAuthUserRequest(
  modifications?: Partial<AuthUserRequest>,
): AuthUserRequest {
  return {
    email: Email.create(faker.internet.email()),
    password: faker.internet.password(),
    ...modifications,
  };
}

describe(`${AuthUserUseCase.name}`, () => {
  let userRepo: jest.Mocked<MongoDbUserRepository>;
  let sut: AuthUserUseCase;
  let hasher: jest.Mocked<Hasher>;
  let encrypt: jest.Mocked<Encrypter>;
  let envService: jest.Mocked<EnvService>;

  beforeEach(async () => {
    userRepo = mock<MongoDbUserRepository>();
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.existsByEmail.mockResolvedValue(false);
    userRepo.save.mockResolvedValue();

    hasher = mock<Hasher>();
    hasher.compare.mockResolvedValue(true);
    hasher.hash.mockResolvedValue(faker.internet.password());

    encrypt = mock<Encrypter>();
    envService = mock<EnvService>();

    sut = new AuthUserUseCase(userRepo, hasher, encrypt, envService);
  });

  it('should authenticate a valid user', async () => {
    const authUserRequest = makeAuthUserRequest();
    userRepo.existsByEmail.mockResolvedValueOnce(true);

    const userMock = User.create({
      email: authUserRequest.email,
      name: faker.person.fullName(),
      password: authUserRequest.password,
    });

    userRepo.findByEmail.mockResolvedValueOnce(userMock);

    hasher.compare.mockResolvedValueOnce(true);

    encrypt.encrypt.mockResolvedValueOnce(faker.internet.jwt());

    const user = await sut.execute(authUserRequest);

    expect(user).toBeDefined();
    expect(user.token).toBeDefined();
    expect(user.user).toBeDefined();
    expect(user.user.email).toEqual(authUserRequest.email.value);
  });

  it('should throw error when user not exist', async () => {
    const authUserRequest = makeAuthUserRequest();
    userRepo.existsByEmail.mockResolvedValueOnce(false);
    await expect(sut.execute(authUserRequest)).rejects.toThrow(
      'Email ou senha inválidos',
    );
  });

  it('should throw error when password is invalid', async () => {
    const authUserRequest = makeAuthUserRequest();
    userRepo.existsByEmail.mockResolvedValueOnce(true);

    const userMock = User.create({
      email: authUserRequest.email,
      name: faker.person.fullName(),
      password: authUserRequest.password,
    });

    userRepo.findByEmail.mockResolvedValueOnce(userMock);

    hasher.compare.mockResolvedValueOnce(false);

    await expect(sut.execute(authUserRequest)).rejects.toThrow(
      'Email ou senha inválidos',
    );
  });
});
