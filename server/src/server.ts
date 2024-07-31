import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { authenticate } from "./handlers/auth";
import { loginHandler, signupHandler } from "./handlers/userHandler";
import { checkAuthHandler, refreshHandler } from "./handlers/authHandler";
import { addTaskHandler, deleteTaskHandler, editTaskHandler, getTasksHandler } from "./handlers/tasksHandler";

const app = express();

dotenv.config();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
}

app.use(cors(corsOptions)); // Middleware to enable CORS
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// User related routes
app.post("/login", loginHandler);
app.post("/signup", signupHandler);

// Auth related routes
app.get("/refresh", refreshHandler);
app.get("/check-auth", checkAuthHandler);

// Tasks related routes
app.get("/tasks", authenticate, getTasksHandler);
app.post("/add-task", authenticate, addTaskHandler);
app.put("/edit-task/:taskId", authenticate, editTaskHandler);
app.delete("/delete-task/:taskId", authenticate, deleteTaskHandler);


// Run the app
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
