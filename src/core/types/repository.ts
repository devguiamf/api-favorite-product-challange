import { Entity } from '../entity/entity';
import { UniqueEntityID } from '../entity/unique-entity-id';

export interface Repository<TEntity = Entity<any>> {
  save?(entity: TEntity): Promise<void>;
  findById?(id: UniqueEntityID): Promise<TEntity | null>;
  delete?(id: UniqueEntityID): Promise<void>;
  exists?(id: UniqueEntityID): Promise<boolean>;
  update?(entity: TEntity): Promise<void>;
}
