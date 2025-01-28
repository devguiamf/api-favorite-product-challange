import { HttpStatus } from '@nestjs/common';
import { BaseError } from '../base-error';

export class EntityNotFoundError extends BaseError {
  constructor(entity: string, id?: string, message?: string, details?: string) {
    super({
      message: message ?? `Recurso não encontrado!`,
      code: HttpStatus.NOT_FOUND,
      details:
        details ?? `A entidade ${entity} ${id && `- ${id}`} não foi encontrada`,
    });
  }
}
