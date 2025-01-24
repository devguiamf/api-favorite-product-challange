import { Entity } from '../entity';
import { UniqueEntityID } from '../unique-entity-id';
import { ValueObject } from '../value-object';

describe('Entity', () => {
  class EntityMock extends Entity<{ name: string }> {
    constructor(props: { name: string }, id?: UniqueEntityID) {
      super(props, id);
    }
  }

  class ValueObjectMock extends ValueObject<{ name: string }> {
    constructor(props: { name: string }) {
      super(props);
    }
  }

  let entity: EntityMock;
  let valueObject: ValueObjectMock;

  describe('Entity', () => {
    it('must create an entity passing a uuid', () => {
      const id = new UniqueEntityID('7b80d16b-67f6-4281-b7ca-386a4f56899e');
      entity = new EntityMock({ name: 'John Doe' }, id);
      expect(entity.id).toBe(id);
    });

    it('should compare entities', () => {
      const entity1 = new EntityMock({ name: 'John Doe' });
      const entity2 = new EntityMock({ name: 'John Doe' });
      const entity3 = new EntityMock({ name: 'Jane Doe' });

      expect(entity1.equals(entity1)).toBeTruthy();
      expect(entity1.equals(entity2)).toBeFalsy();
    });

    it('should return the entity props', () => {
      entity = new EntityMock({ name: 'John Doe' });
      expect(entity.toProps()).toEqual({
        name: 'John Doe',
        id: entity.id.toString(),
      });
    });
  });

  describe('Unique Entity ID', () => {
    it('should create a new unique entity id', () => {
      const id = new UniqueEntityID('7b80d16b-67f6-4281-b7ca-386a4f56899e');
      expect(id.toString()).toBe('7b80d16b-67f6-4281-b7ca-386a4f56899e');

      const id2 = new UniqueEntityID();
      expect(id2.toValue()).not.toBeNull();
    });

    it('should compare unique entity ids', () => {
      const id1 = new UniqueEntityID('7b80d16b-67f6-4281-b7ca-386a4f56899e');
      const id2 = new UniqueEntityID('7b80d16b-67f6-4281-b7ca-386a4f56899e');
      const id3 = new UniqueEntityID('7b80d16b-67f6-4281-b7ca-386a4f56899f');

      expect(id1.equals(id1)).toBeTruthy();
      expect(id1.equals(id2)).toBeTruthy();
      expect(id1.equals(id3)).toBeFalsy();
    });
  });

  describe('Value Object', () => {
    it('should compare value objects', () => {
      valueObject = new ValueObjectMock({ name: 'John Doe' });
      const valueObject2 = new ValueObjectMock({ name: 'John Doe' });
      const valueObject3 = new ValueObjectMock({ name: 'Jane Doe' });

      expect(valueObject.equals(valueObject)).toBeTruthy();
      expect(valueObject.equals(valueObject2)).toBeTruthy();
      expect(valueObject.equals(valueObject3)).toBeFalsy();
    });

    it('should return the value object props', () => {
      const valueObject = new ValueObjectMock({ name: 'John Doe' });
      expect(valueObject.toObject()).toEqual({ name: 'John Doe' });
    });
  });
});
