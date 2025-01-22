import { HttpStatus } from '@nestjs/common';
import { BaseError } from '../base-error';

export class EntityIsIsAlreadyExistError extends BaseError {
  constructor(entity: string, id?: string) {
    super({
      message: `Recurso ja existe!`,
      code: HttpStatus.CONFLICT,
      details: `A entidade ${entity} ${id && `- ${id}`} se encontra ja cadastrada`,
    });
  }
}