"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./handlers/auth");
const userHandler_1 = require("./handlers/userHandler");
const authHandler_1 = require("./handlers/authHandler");
const tasksHandler_1 = require("./handlers/tasksHandler");
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions)); // Middleware to enable CORS
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.use((0, cookie_parser_1.default)()); // Middleware to parse cookies
// Test route
app.get("/ping", (req, res) => {
    res.send("pong");
});
// User related routes
app.post("/login", userHandler_1.loginHandler);
app.post("/signup", userHandler_1.signupHandler);
// Auth related routes
app.get("/refresh", authHandler_1.refreshHandler);
app.get("/check-auth", authHandler_1.checkAuthHandler);
// Tasks related routes
app.get("/tasks", auth_1.authenticate, tasksHandler_1.getTasksHandler);
app.post("/add-task", auth_1.authenticate, tasksHandler_1.addTaskHandler);
app.put("/edit-task/:taskId", auth_1.authenticate, tasksHandler_1.editTaskHandler);
app.delete("/delete-task/:taskId", auth_1.authenticate, tasksHandler_1.deleteTaskHandler);
// Run the app
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
