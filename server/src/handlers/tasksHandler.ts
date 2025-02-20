import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const statusMap: { [key: string]: number } = {
  todo: 1,
  in_progress: 2,
  under_review: 3,
  finished: 4,
};

interface CustomRequest extends Request {
  user?: any;
}

export const getTasksHandler = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token." });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });

    const groupedTasks = Object.keys(statusMap).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as { [key: string]: typeof tasks });

    tasks.forEach((task) => {
      const statusKey = Object.keys(statusMap).find(
        (key) => statusMap[key] === task.status
      );
      if (statusKey) {
        groupedTasks[statusKey].push(task);
      }
    });

    res.status(200).json(groupedTasks);
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};

export const addTaskHandler = async (req: CustomRequest, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;
  
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token." });
  }

  try {
    const newTask = await prisma.task.create({
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
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};

export const editTaskHandler = async (req: CustomRequest, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status, priority, deadline } = req.body;
  
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token." });
  }

  try {
    const updatedTask = await prisma.task.update({
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
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};

export const deleteTaskHandler = async (req: CustomRequest, res: Response) => {
  const { taskId } = req.params;

  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found in token." });
  }

  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error: ${(error as Error).message}` });
  }
};