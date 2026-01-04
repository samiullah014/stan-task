import { z } from "zod";
import { TASK_STATUS } from "../constants/task";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  status: z
    .enum([
      TASK_STATUS.PENDING,
      TASK_STATUS.IN_PROGRESS,
      TASK_STATUS.COMPLETED,
    ] as [string, ...string[]])
    .default(TASK_STATUS.PENDING),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  status: z
    .enum([
      TASK_STATUS.PENDING,
      TASK_STATUS.IN_PROGRESS,
      TASK_STATUS.COMPLETED,
    ] as [string, ...string[]])
    .optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
