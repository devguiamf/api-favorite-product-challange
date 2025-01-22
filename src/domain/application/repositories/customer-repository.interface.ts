import { Repository } from 'src/core/types/repository';
import { Customer } from 'src/domain/enterprise/entities/customer';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';

export abstract class CustomerRepository implements Repository<Customer> {
  abstract save(entity: Customer): Promise<void>;
  abstract existsByEmail(email: Email): Promise<boolean>;
  abstract findByEmail(email: Email): Promise<Customer>;
}
