import * as z from 'zod';
export const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.string().optional(),
    name: z.string().optional(),
    age: z.coerce.number().min(18, {message: "Чтобы пользоваться сервис вы должны быть совершеннолетним"}).optional(),

})