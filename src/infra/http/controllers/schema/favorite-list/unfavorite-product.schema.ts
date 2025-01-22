import { z } from 'zod';

export const UnFavoriteProductSchema = z
  .object({
    productId: z.number(),
  })
export type TUnFavoriteProductSchema = z.infer<typeof UnFavoriteProductSchema>;
