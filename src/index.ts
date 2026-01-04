import express from "express";
import tasksRouter from "./routes/tasks";
import { errorHandler } from "./middleware/errorHandler";
import { config } from "./config";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the CRUD API",
    endpoints: {
      tasks: "/api/tasks",
      "get all tasks": "GET /api/tasks",
      "get task by id": "GET /api/tasks/:id",
      "create task": "POST /api/tasks",
      "update task": "PUT /api/tasks/:id",
      "delete task": "DELETE /api/tasks/:id",
    },
  });
});

app.use("/api/tasks", tasksRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
