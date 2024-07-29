import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    deadline: z.date().min(new Date(), "Due date must be in the future").optional(),
    priority: z.enum(["unset", "low", "medium", "urgent"]).optional(),
    status: z.enum(["todo", "in_progress", "under_review", "finished"]),
})

export type TaskSchema = z.infer<typeof taskSchema>;