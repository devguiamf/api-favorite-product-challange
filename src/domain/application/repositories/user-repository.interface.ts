import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { Repository } from 'src/core/types/repository';
import { User } from 'src/domain/enterprise/entities/customer';
import { Email } from 'src/domain/enterprise/entities/value-objects/email';

export abstract class UserRepository implements Repository<User> {
  abstract save(entity: User): Promise<void>;
  abstract existsByEmail(email: Email): Promise<boolean>;
  abstract findByEmail(email: Email): Promise<User>;
  abstract findById(id: UniqueEntityID): Promise<User | null>;
}
