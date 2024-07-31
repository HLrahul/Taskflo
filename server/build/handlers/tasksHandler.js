"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHandler = exports.editTaskHandler = exports.addTaskHandler = exports.getTasksHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const statusMap = {
    todo: 1,
    in_progress: 2,
    under_review: 3,
    finished: 4,
};
const getTasksHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID not found in token." });
    }
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                userId: userId,
            },
        });
        const groupedTasks = Object.keys(statusMap).reduce((acc, key) => {
            acc[key] = [];
            return acc;
        }, {});
        tasks.forEach((task) => {
            const statusKey = Object.keys(statusMap).find((key) => statusMap[key] === task.status);
            if (statusKey) {
                groupedTasks[statusKey].push(task);
            }
        });
        res.status(200).json(groupedTasks);
    }
    catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
exports.getTasksHandler = getTasksHandler;
const addTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, status, priority, deadline } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID not found in token." });
    }
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                deadline: deadline ? new Date(deadline) : null,
                userId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
exports.addTaskHandler = addTaskHandler;
const editTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { taskId } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID not found in token." });
    }
    try {
        const updatedTask = yield prisma.task.update({
            where: {
                id: taskId,
                userId: userId,
            },
            data: {
                title,
                description,
                status: status,
                priority: priority,
                deadline: deadline ? new Date(deadline) : null,
            },
        });
        if (!updatedTask) {
            return res
                .status(404)
                .json({ message: "Task not found." });
        }
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
exports.editTaskHandler = editTaskHandler;
const deleteTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { taskId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID not found in token." });
    }
    try {
        const deletedTask = yield prisma.task.delete({
            where: {
                id: taskId,
                userId: userId,
            },
        });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found." });
        }
        res.status(200).json({ message: "Task deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
});
exports.deleteTaskHandler = deleteTaskHandler;
