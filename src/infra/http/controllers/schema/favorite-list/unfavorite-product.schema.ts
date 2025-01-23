import { z } from 'zod';

export const UnFavoriteProductSchema = z
  .object({
    productApiId: z.number({
      message: 'ProductApiId é obrigatório',
    }),
  })
export type TUnFavoriteProductSchema = z.infer<typeof UnFavoriteProductSchema>;
