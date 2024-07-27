import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { barlow } from "../app/layout";

import LoginForm from "./forms/login-form";
import SignUpForm from "./forms/signup-form";

export default function AuthCard({ type }: { type: "login" | "signup" }) {
  return (
    <Card className="w-[360px] md:w-[546px] lg:w-[546px] p-4">
      <CardHeader>
        <CardTitle
          className={`w-full flex align-center justify-center ${barlow.className} text-3xl tracking-normal`}
        >
          Welcome to <p className="text-taskflo-text ml-1">Taskflo</p> !
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === "login" ? <LoginForm /> : <SignUpForm />}
      </CardContent>
      <CardFooter className="w-full flex items-center justify-center">
        {type === "login" ? (
          <p className="text-sm">
            Don&apos;t have an account? Create a{" "}
            <Link href="/signup" style={{ color: "#0054A1" }}>
              new account
            </Link>
            .
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#0054A1" }}>
              log in
            </Link>
            .
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
