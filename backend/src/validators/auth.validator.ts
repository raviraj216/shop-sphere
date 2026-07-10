import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),

    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),

    email: z.email("Please enter a valid email address").trim().toLowerCase(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password is too long"),
});

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address").trim().toLowerCase(),

    password: z.string().min(1, "Password is required"),
});
