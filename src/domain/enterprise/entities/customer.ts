import { Entity } from 'src/core/entity/entity';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Email } from './value-objects/email';

export type UserProps = {
  name: string;
  email: Email;
  password?: string;
};

export class User extends Entity<UserProps> {
  public static create(props: UserProps): User {
    return new User(props);
  }

  public static restore(props: UserProps, id: UniqueEntityID): User {
    return new User(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email.value;
  }

  get password(): string {
    return this.props.password ?? '';
  }
}
