import { Email } from "../email";

describe('Email', () => {
    it('should create a valid email', () => {
        const email = Email.create('email@email.com')
        expect(email.value).toBe('email@email.com');
    });
});