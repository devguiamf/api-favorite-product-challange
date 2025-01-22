import { z } from 'zod';

export const CreateFavoriteListSchema = z.object({
  title: z.string({
    message: 'Titulo da lista é obrigatório!',
  }),

  userId: z.string({
    message: 'Usuário é obrigatório!',
  }),

  descritpion: z.string().optional().default(''),
});

export type TCreateFavoriteListSchema = z.infer<typeof CreateFavoriteListSchema>;
