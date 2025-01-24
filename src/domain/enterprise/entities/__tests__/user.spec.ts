import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { User } from '../user';
import { Email } from '../value-objects/email';

describe('User', () => {
  it('should create a valid user', () => {
    const user = User.create({
      name: 'User',
      email: Email.create('email@email.com'),
    });

    expect(user.name).toBe('User');
    expect(user.email).toBe('email@email.com');
    expect(user.id).toBeDefined();
  });

  it('should restore a user', () => {
    const user = User.restore(
      {
        name: 'User',
        email: Email.create('email@email.com'),
      },
      new UniqueEntityID(),
    );

    expect(user.name).toBe('User');
    expect(user.email).toBe('email@email.com');
    expect(user.id).toBeDefined();
  });
});
