import { z } from 'zod';

export const CreateFavoriteListSchema = z.object({
  title: z.string({
    message: 'Titulo da lista é obrigatório!',
  }),

  userId: z.string({
    message: 'Usuário é obrigatório!',
  }),

  description: z.string().optional().default(''),
});

export type TCreateFavoriteListSchema = z.infer<
  typeof CreateFavoriteListSchema
>;
