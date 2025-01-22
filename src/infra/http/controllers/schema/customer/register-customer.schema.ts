import { z } from 'zod';

export const RegisterCustomerSchema = z.object({
  name: z.string({
    message: 'Nome do cliente é obrigatório!',
  }),
  email: z
    .string({
      message: 'E-mail do cliente é obrigatório!',
    })
    .email({
      message:
        'E-mail do cliente deve estar no formato válido (mail@mail.com)!',
    }),
  password: z.string({
    message: 'Senha do cliente é obrigatório!',
  }),
});

export type TRegisterCustomerSchema = z.infer<typeof RegisterCustomerSchema>;
