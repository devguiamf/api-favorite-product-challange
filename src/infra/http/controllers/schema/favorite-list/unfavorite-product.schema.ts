import { z } from 'zod';

export const UnFavoriteProductSchema = z
  .object({
    productId: z.string(),
  })
export type TUnFavoriteProductSchema = z.infer<typeof UnFavoriteProductSchema>;
