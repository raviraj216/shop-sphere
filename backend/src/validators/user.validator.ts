import { z } from "zod";

export const createUserSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .email("Invalid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(6, "Password must contain at least 6 characters")

});