import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string().length(24),
    quantity: z.number().int().positive()
});

export const updateCartItemSchema = z.object({
    quantity: z.number().int().min(1)
});

export type AddToCartDto = z.infer<typeof addToCartSchema>;
export type UpdateCartItemDto = z.infer<typeof updateCartItemSchema>;