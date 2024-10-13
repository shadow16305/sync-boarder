"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { signInSchema, signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import axios from "axios";
import toast from "react-hot-toast";

type AuthFormValues = { email: string; password: string; username: string } | { email: string; password: string };

export const AuthForm = () => {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/sign-in") {
      setVariant("LOGIN");
    } else if (pathname === "/sign-up") {
      setVariant("REGISTER");
    }
  }, []);

  const getSchema = (variant: string) => {
    if (variant === "LOGIN") return signInSchema;
    if (variant === "REGISTER") return signUpSchema;
    throw new Error(`Unknown variant: ${variant}`);
  };

  const getDefaultValues = (variant: string) => {
    if (variant === "REGISTER") {
      return { email: "", password: "", username: "" };
    } else {
      return { email: "", password: "" };
    }
  };

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(getSchema(variant)),
    defaultValues: getDefaultValues(variant),
  });

  const onSubmit = async (data: z.infer<ReturnType<typeof getSchema>>) => {
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong!");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/boards");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { callbackUrl: "/boards" })
      .then((callback) => {
        console.log("signIn callback:", callback);
        if (callback?.error) {
          toast.error("Invalid credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Signed up!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{variant === "LOGIN" ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            {variant === "REGISTER" && (
              <FormField
                control={form.control}
                name="username"
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              Submit
            </Button>
          </form>
          <div className="flex items-center justify-between gap-x-2">
            <Button
              type="button"
              variant="secondary"
              className="w-1/2"
              disabled={isLoading}
              onClick={() => socialAction("google")}>
              <FcGoogle size={28} />
            </Button>
            <Button type="button" variant="secondary" className="w-1/2" disabled={isLoading}>
              <FaGithub size={28} />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          {variant === "LOGIN" ? (
            <Link
              href="/sign-up"
              className="w-full text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
              Don't have an account? Sign up
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="w-full text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
              Already have an account? Log in
            </Link>
          )}
        </CardFooter>
      </Card>
    </Form>
  );
};
