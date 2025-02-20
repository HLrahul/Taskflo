"use client";

import { format } from "date-fns";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SheetClose } from "../ui/sheet";
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { useTasks } from "@/app/store/tasksContext";

import TaskInputLabel from "../dashboard/task_input_label";

import { Task, TaskSchema, taskSchema } from "@/validation/TaskSchema";

import StatusIcon from "@/public/status_icon.svg";
import DeadlineIcon from "@/public/calendar_icon.svg";
import PriorityIcon from "@/public/priority_icon.svg";
import DescriptionIcon from "@/public/description_icon.svg";

interface TaskFormProps {
  initialStatus?: "todo" | "in_progress" | "under_review" | "finished";
  disableStatus?: boolean;
  task?: Task;
}

export default function TaskForm({
  initialStatus,
  disableStatus,
  task,
}: TaskFormProps) {
  const { addTask, editTask, deleteTask } = useTasks();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: task?.status ?? initialStatus,
      title: task?.title ?? "",
      description: task?.description ?? undefined,
      priority: task?.priority,
      deadline: task?.deadline ?? undefined,
    },
  });
  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  function postResponse() {
    form.reset();
    setIsLoading(false);

    // Close the sheet
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  }

  async function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
  
    try {
      if (task) {
        await deleteTask(task.id);
        postResponse();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(data : any) {
    setIsLoading(true);

    if (task?.id) {
      data = { ...data, id: task.id, created_at: task.created_at } as Task;
    } else {
      data = data as TaskSchema;
    }

    try {
      if (task?.id) {
        await editTask(data, false);
      } else {
        await addTask(data);
      }
      postResponse();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1 h-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="text-4xl px-0 bg-transparent border-0 shadow-none focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-5 flex items-center justify-between  w-[70%]">
          <TaskInputLabel Icon={<StatusIcon />} text="Status" />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={disableStatus}
                >
                  <FormControl>
                    <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                      <SelectValue placeholder="Not selected" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="todo">To do</SelectItem>
                      <SelectItem value="in_progress">In progress</SelectItem>
                      <SelectItem value="under_review">Under review</SelectItem>
                      <SelectItem value="finished">Finished</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className="ml-3" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  w-[70%]">
          <TaskInputLabel Icon={<PriorityIcon />} text="Priority" />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0">
                      <SelectValue placeholder="Not selected" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  w-[70%]">
          <TaskInputLabel Icon={<DeadlineIcon />} text="Deadline" />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-transparent border-0 shadow-none focus:ring-0",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50 -mr-1" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between  w-[70%]">
          <TaskInputLabel Icon={<DescriptionIcon />} text="Description" />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormControl>
                  <Input
                    placeholder="Task description"
                    {...field}
                    className="bg-transparent border-0 shadow-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="mt-5 ml-2 flex items-center gap-5 cursor-pointer">
                <PlusIcon className="w-5 h-5" />
                <p className="text-sm">Add custom property</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>Feature will be available soon</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator className="mt-5" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="mt-5 text-sm text-gray-400 w-full flex items-center justify-start">
                Start writing, or drag your own files here.
              </p>
            </TooltipTrigger>
            <TooltipContent>Feature will be available soon</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="mt-auto flex flex-col gap-2">
          {task?.id && (
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={(e) => handleDeleteTask(e)}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete task
            </Button>
          )}

          <Button type="submit" className="mt-auto" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {task?.id ? "Save changes" : "Add task"}
          </Button>
        </div>

        <SheetClose>
          <Button type="button" ref={sheetCloseRef} className="hidden" />
        </SheetClose>
      </form>
    </Form>
  );
}

