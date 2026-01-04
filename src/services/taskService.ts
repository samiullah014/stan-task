import { db } from "../db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { NotFoundError, BadRequestError } from "../errors/AppError";
import { NewTask, Task } from "../db/schema";

export class TaskService {
  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async getTaskById(id: number): Promise<Task> {
    if (isNaN(id)) {
      throw new BadRequestError("Invalid task ID");
    }

    const taskList = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    
    if (taskList.length === 0) {
      throw new NotFoundError("Task not found");
    }

    return taskList[0];
  }

  async createTask(data: NewTask): Promise<Task> {
    const [newTask] = await db
      .insert(tasks)
      .values(data)
      .returning();

    return newTask;
  }

  async updateTask(id: number, data: Partial<NewTask>): Promise<Task> {
    if (isNaN(id)) {
      throw new BadRequestError("Invalid task ID");
    }

    const [updatedTask] = await db
      .update(tasks)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask) {
      throw new NotFoundError("Task not found");
    }

    return updatedTask;
  }

  async deleteTask(id: number): Promise<Task> {
    if (isNaN(id)) {
      throw new BadRequestError("Invalid task ID");
    }

    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      throw new NotFoundError("Task not found");
    }

    return deletedTask;
  }
}

export const taskService = new TaskService();

