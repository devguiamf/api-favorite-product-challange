import { Entity } from 'src/core/entity/entity';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Email } from './value-objects/email';

export type CustomerProps = {
  name: string;
  email: Email;
  password?: string;
};

export type CustomerWithPasswordOmit = Omit<CustomerProps, 'password'>;

export class Customer extends Entity<CustomerProps> {
  public static create(props: CustomerProps): Customer {
    return new Customer(props);
  }

  public static restore(
    props: CustomerWithPasswordOmit,
    id: UniqueEntityID,
  ): Customer {
    return new Customer(props, id);
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
