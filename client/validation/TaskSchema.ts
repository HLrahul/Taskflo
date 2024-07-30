import { z } from 'zod';

export const statusMap: { [key: string]: number } = {
  todo: 1,
  in_progress: 2,
  under_review: 3,
  finished: 4,
};

export const priorityMap: { [key: string]: number } = {
  unset: 0,
  low: 1,
  medium: 2,
  urgent: 3,
};

export const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
    deadline: z.date().min(new Date(), "Due date must be in the future").optional(),
    priority: z.enum(["unset", "low", "medium", "urgent"]).optional(),
    status: z.enum(["todo", "in_progress", "under_review", "finished"]),
})

export type TaskSchema = z.infer<typeof taskSchema>;