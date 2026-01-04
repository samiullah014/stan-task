import { Router, Request, Response } from "express";
import { taskService } from "../services/taskService";
import { createTaskSchema, updateTaskSchema } from "../validations/task";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validator";

const router = Router();

// GET /tasks - Get all tasks
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const allTasks = await taskService.getAllTasks();
    res.json(allTasks);
  })
);

// GET /tasks/:id - Get a single task by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const task = await taskService.getTaskById(id);
    res.json(task);
  })
);

// POST /tasks - Create a new task
router.post(
  "/",
  validate(createTaskSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  })
);

// PUT /tasks/:id - Update a task
router.put(
  "/:id",
  validate(updateTaskSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedTask = await taskService.updateTask(id, req.body);
    res.json(updatedTask);
  })
);

// DELETE /tasks/:id - Delete a task
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deletedTask = await taskService.deleteTask(id);
    res.json({ message: "Task deleted successfully", task: deletedTask });
  })
);

export default router;
