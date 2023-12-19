import * as z from 'zod';
export const formSchema = z.object({
    number: z.coerce.number(),
    studentIds: z.array(z.string()),
})