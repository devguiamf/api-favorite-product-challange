import { Repository } from 'src/core/types/repository';
import { UniqueEntityID } from 'src/core/entity/unique-entity-id';
import { FavoriteList } from 'src/domain/enterprise/entities/favorite-list';


export abstract class FavoriteListRepository
  implements Repository<FavoriteList>
{
  abstract save(entity: FavoriteList): Promise<void>;
  abstract exists(id: UniqueEntityID): Promise<boolean>;
  abstract findById(id: UniqueEntityID): Promise<FavoriteList>;
  abstract delete(id: UniqueEntityID): Promise<void>;
  abstract update(entity: FavoriteList): Promise<void>;
  abstract favoriteProdcut(entity: FavoriteList): Promise<void>;
  abstract unfavoriteProduct(entity: FavoriteList): Promise<void>;
}
