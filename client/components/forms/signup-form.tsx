"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

import { signUpSchema, SignUpSchema } from "@/validation/signUpSchema";

async function handleSignUp(data: SignUpSchema) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, data);
  return response.data;
}

export default function SignUpForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (res) => {
      toast({
        title: "Account created",
        description: "Login to access your dashboard",
        action: (
          <ToastAction altText="Login">
            <Link href="/login">Login</Link>
          </ToastAction>
        ),
      });

      form.reset();
      setIsLoading(false);
    },
    onError: (res: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: res.response.data.message,
      });
      setIsLoading(false);
    }
  });

  function onSubmit(data: SignUpSchema) {
    setIsLoading(true);
    mutation.mutate(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="border-gray-300 text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  className="border-gray-300 text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="border-gray-300 text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full hover:bg-gradient-taskflo-button bg-gradient-taskflo-hover-button text-white mt-3"
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Sign up
        </Button>
      </form>
    </Form>
  );
}
