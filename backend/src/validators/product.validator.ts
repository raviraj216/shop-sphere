import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),

    description: z.string(),

    price: z.number().positive(),

    discountPrice: z.number().optional(),

    quantity: z.number(),

    category: z.string(),
});
