import { Email } from '../email';
import { InvalidEmailFormatError } from '../errors/invalid-email-format-error';

describe('Email', () => {
  it('should create a valid email', () => {
    const email = Email.create('email@email.com');
    expect(email.value).toBe('email@email.com');
  });

  it('should throw an error for invalid email', () => {
    const email = 'email';
    try {
      Email.create(email);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidEmailFormatError);
      expect(error.message).toBe('Email inválido!');
      expect(error.details).toBe(
        `O email "${email}" não está em um formato válido. (Ex: fulano@mail.com)`,
      );
    }
  });
});
