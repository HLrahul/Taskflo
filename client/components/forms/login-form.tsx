"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/components/ui/use-toast";

import { loginSchema, LoginSchema } from "@/validation/loginSchema";

async function handleLogin(data: LoginSchema) {
  const response = await axios.post(`/api/login`, data);
  return response.data;
}

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      toast({
        title: "Logged in",
        description: "Navigating you to dashboard...",
      })

      router.push("/dashboard");
    },
    onError: (res: any) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: res.message,
      });
    }
  });

  function onSubmit(data: LoginSchema) {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full hover:bg-gradient-taskflo-button bg-gradient-taskflo-hover-button text-white mt-3"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
