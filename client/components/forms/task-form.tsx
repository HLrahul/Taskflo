"use client";

import { z } from 'zod';
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";

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
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";
import TaskInputLabel from "../dashboard/task_input_label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { TaskSchema, taskSchema } from "@/validation/TaskSchema";

import StatusIcon from "@/public/status_icon.svg";
import DeadlineIcon from "@/public/calendar_icon.svg";
import PriorityIcon from "@/public/priority_icon.svg";
import DescriptionIcon from "@/public/description_icon.svg";

export default function TaskForm() {
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  function onSubmit(data: z.infer<typeof taskSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 h-full">
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

        <div className="mt-5 flex items-center justify-between">
          <TaskInputLabel Icon={<StatusIcon />} text="Status" />
          <FormField
            control={form.control}
            name="status"
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
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="To-do">To do</SelectItem>
                      <SelectItem value="In Progress">In progress</SelectItem>
                      <SelectItem value="Under Review">Under review</SelectItem>
                      <SelectItem value="Finished">Finished</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage className='ml-3'/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
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
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
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
                  <PopoverContent className="w-auto p-0" align="start">
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
        <div className="flex items-center justify-between">
          <TaskInputLabel Icon={<DescriptionIcon />} text="Description" />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='w-[50%]'>
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

        <Button type="submit" className="mt-auto">Submit</Button>
      </form>
    </Form>
  );
}
