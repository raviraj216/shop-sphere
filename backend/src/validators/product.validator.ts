import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),
  slug: z.string(),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().int().min(0),
  category: z.string(),
  sku : z.string(),
});


export const updateProductSchema = createProductSchema.partial();
