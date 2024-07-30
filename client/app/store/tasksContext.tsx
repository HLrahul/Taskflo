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

import { priorityMap, statusMap, TaskSchema } from "@/validation/TaskSchema";

interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: number;
  created_at: string;
  status: number;
}

interface TasksContextType {
  tasks: { [key: string]: Task[] };
  fetchTasks: () => void;
  addTask: (newTask: TaskSchema) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loadRef = useRef(false);

  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          withCredentials: true,
        }
      );
      setTasks(response.data);
    } catch (error) {
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
        `${process.env.NEXT_PUBLIC_API_URL}/add-task`,
        transformedData,
        {
          withCredentials: true,
        }
      );
      const task = response.data;

      setTasks((prevTasks) => {
        const statusKey = Object.keys(statusMap).find(key => statusMap[key] === task.status) || "todo";
        return {
          ...prevTasks,
          [statusKey]: [...(prevTasks[statusKey] || []), task],
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

  useEffect(() => {
    if (!loadRef.current) {
      fetchTasks();
      loadRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, fetchTasks, addTask }}>
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
