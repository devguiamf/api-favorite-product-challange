import { EntityIsIsAlreadyExistError } from '../entity-is-alredy-exist-error';
import { EntityNotFoundError } from '../entity-not-found-error';

describe('Error', () => {
  describe('Entity is Already Registered Error', () => {
    it('should create an error a default message', () => {
      const error = new EntityIsIsAlreadyExistError('Entity');
      expect(error.message).toBe('Recurso ja existe!');
      expect(error.code).toBe(409);
      expect(error.details).toBe('A entidade Entity se encontra ja cadastrada');
      expect(error.name).toBe('EntityIsIsAlreadyExistError');
    });
  });

  describe('Entity not found Error', () => {
    it('should create an error a default message', () => {
      const id = undefined;
      const error = new EntityNotFoundError('Entity', id);
      expect(error.message).toBe('Recurso não encontrado!');
      expect(error.code).toBe(404);
      expect(error.details).toBe(`A entidade Entity ${id} não foi encontrada`);
    });

    it('should create an error a custom message', () => {
      const id = '7b80d16b-67f6-4281-b7ca-386a4f56899e';
      const message = 'Custom message';
      const details = 'Custom details';
      const error = new EntityNotFoundError('Entity', id, message, details);
      expect(error.message).toBe(message);
      expect(error.code).toBe(404);
      expect(error.details).toBe(details);
    });
  });
});
