import { z } from "zod";

export const addToCartSchema = z.object({

    productId: z.string().length(24),

    quantity: z
        .number()
        .int()
        .positive()

});

export type AddToCartDto =
    z.infer<typeof addToCartSchema>;