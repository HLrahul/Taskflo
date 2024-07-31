"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";

import {
  priorityMap,
  statusMap,
  Task,
  TaskSchema,
} from "@/validation/TaskSchema";

interface TasksContextType {
  tasks: { [key: string]: Task[] };
  fetchTasks: () => void;
  addTask: (newTask: TaskSchema) => Promise<void>;
  editTask: (updatedTaskData: Task, fromKanban: boolean) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<{ [key: string]: Task[] }>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loadRef = useRef(false);

  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const { toast } = useToast();

  const mapStatus = (
    status: number
  ): "todo" | "in_progress" | "under_review" | "finished" => {
    switch (status) {
      case 1:
        return "todo";
      case 2:
        return "in_progress";
      case 3:
        return "under_review";
      case 4:
        return "finished";
      default:
        throw new Error("Invalid status value");
    }
  };

  const mapPriority = (
    priority: number
  ): "unset" | "low" | "medium" | "urgent" => {
    switch (priority) {
      case 0:
        return "unset";
      case 1:
        return "low";
      case 2:
        return "medium";
      case 3:
        return "urgent";
      default:
        throw new Error("Invalid priority value");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `api/task`,
        {
          withCredentials: true,
        }
      );

      const tasks = Object.keys(response.data).reduce(
        (acc: { [key: string]: Task[] }, key: string) => {
          const transformedTasks = response.data[key].map((task: any) => ({
            ...task,
            status: mapStatus(task.status),
            priority: mapPriority(task.priority),
            deadline: task.deadline ? new Date(task.deadline) : null,
            created_at: new Date(task.created_at),
          }));
          return { ...acc, [key]: transformedTasks };
        },
        {}
      );

      setTasks(tasks);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred while fetching tasks",
        description: "Try refreshing or logging in again.",
        variant: "destructive",
      });
    }
  };

  const addTask = async (newTask: TaskSchema) => {
    const transformedData = {
      ...newTask,
      status: statusMap[newTask.status],
      priority: priorityMap[newTask.priority ?? "unset"],
      description: newTask.description ?? "",
      deadline: newTask.deadline ?? null,
    };

    try {
      const response = await axios.post(
        `api/task`,
        transformedData,
        {
          withCredentials: true,
        }
      );
      const task = response.data;

      setTasks((prevTasks) => {
        const statusKey =
          Object.keys(statusMap).find(
            (key) => statusMap[key] === task.status
          ) || "todo";

        const updatedTaskWithDates = {
          ...task,
          deadline: task.deadline ? new Date(task.deadline) : null,
          created_at: new Date(task.created_at),
          status: mapStatus(task.status),
          priority: mapPriority(task.priority),
        };

        return {
          ...prevTasks,
          [statusKey]: [...prevTasks[statusKey], updatedTaskWithDates],
        };
      });

      toast({
        title: "Task added",
        description: "Task has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Uh oh! An error occured",
        description: (error as Error)?.message,
        variant: "destructive",
      });
    }
  };

  const editTask = async (updatedTaskData: Task, fromKanban: boolean) => {
    const transformedData = {
      ...updatedTaskData,
      status: statusMap[updatedTaskData.status],
      priority: priorityMap[updatedTaskData.priority ?? "unset"],
      description: updatedTaskData.description ?? "",
      deadline: updatedTaskData.deadline ?? null,
    };
  
    try {
      const response = await axios.put(
        `api/task/?taskId=${updatedTaskData.id}`,
        transformedData,
        {
          withCredentials: true,
        }
      );
      const updatedTask = response.data;
  
      setTasks((prevTasks) => {
        const statusKey =
          Object.keys(statusMap).find(
            (key) => statusMap[key] === updatedTask.status
          ) || "todo";

        const updatedTaskWithDates = {
          ...updatedTask,
          deadline: updatedTask.deadline
            ? new Date(updatedTask.deadline)
            : null,
          created_at: new Date(updatedTask.created_at),
          status: mapStatus(updatedTask.status),
          priority: mapPriority(updatedTask.priority),
        };

        return {
          ...prevTasks,
          [statusKey]: prevTasks[statusKey].map((task) =>
            task.id === updatedTask.id
              ? { ...task, ...updatedTaskWithDates }
              : task
          ),
        };
      });
  
      if (!fromKanban) {
        toast({
          title: "Task updated",
          description: "Task has been updated successfully",
        });
      } else {
        toast({
          description: "Task has been moved successfully",
        })
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! An error occured",
        description: (error as Error)?.message,
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(
        `api/task/?taskId=${taskId}`,
        {
          withCredentials: true,
        }
      );

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach((statusKey) => {
          updatedTasks[statusKey] = updatedTasks[statusKey].filter(
            (task) => task.id !== taskId
          );
        });
        return updatedTasks;
      });

      toast({
        title: "Task deleted",
        description: "Task has been deleted successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! An error occured",
        description: (error as Error)?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!loadRef.current) {
      fetchTasks();
      loadRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks, addTask, editTask, setTasks, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return context;
};
