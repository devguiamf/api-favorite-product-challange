import { z } from 'zod';

export const FavoriteProductSchema = z.object({
  productApiId: z.number({ message: 'O campo productApiId é obrigatório' }),
  title: z.string({ message: 'O campo title é obrigatório' }),
  price: z.number({ message: 'O campo price é obrigatório' }),
  image: z.string({ message: 'O campo image é obrigatório' }),
  description: z.string({ message: 'O campo description é obrigatório' }),
  category: z.string({ message: 'O campo category é obrigatório' }),
});

export type TFavoriteProductSchema = z.infer<typeof FavoriteProductSchema>;
