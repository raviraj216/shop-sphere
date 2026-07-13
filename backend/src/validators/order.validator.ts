import { z } from "zod";

export const checkoutSchema = z.object({

    paymentMethod: z.enum([
        "COD",
        "Razorpay",
        "Stripe"
    ]),

    shippingAddress: z.object({

        fullName: z.string().min(3),

        phone: z.string().min(10),

        address: z.string(),

        city: z.string(),

        state: z.string(),

        postalCode: z.string(),

        country: z.string()

    })

}); 

export type CheckoutDto =
    z.infer<typeof checkoutSchema>;

 