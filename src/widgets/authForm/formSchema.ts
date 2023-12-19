import * as z from 'zod';
export const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.string().optional(),
    name: z.string().optional(),
})