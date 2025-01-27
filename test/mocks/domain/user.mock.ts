import { faker } from '@faker-js/faker';
import { User, UserProps } from 'src/domain/enterprise/entities/user';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';

export function makeUser (
  modifications: Partial<UserProps> = {},
): User {
  return User.create({
    email: Email.create(faker.internet.email()),
    name: faker.person.firstName(),
    ...modifications,
  });
}
