import * as z from 'zod';
export const formSchema = z.object({
    weekday: z.string(),
    hour: z.coerce.number().min(8).max(23),
    minute: z.coerce.number().min(0).max(59),
    subjectId: z.string(),
    teacherId: z.string(),
    groupIds: z.array(z.string())
})