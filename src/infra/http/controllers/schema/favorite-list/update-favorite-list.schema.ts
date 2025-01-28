import { z } from 'zod';

export const UpdateFavoriteListSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => data.title || data.description, {
    message:
      'Ao menos um dos campos (title ou description) deve ser fornecido!',
  });

export type TUpdateFavoriteListSchema = z.infer<
  typeof UpdateFavoriteListSchema
>;
