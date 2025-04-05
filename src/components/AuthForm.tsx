"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "./FormField";

const authFormSchema = (type: "signin" | "signup") => {
  return z.object({
    name:
      type === "signup"
        ? z.string().min(1, { message: "Name is required" })
        : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });
};

interface AuthFormProps {
  type: "signin" | "signup";
}
export const AuthForm = (props: AuthFormProps) => {
  const { type } = props;
  const isSignIn = type === "signin";

  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      if (isSignIn) {
        toast.success("Sign In Successful!");
        router.push("/dashboard");
      } else {
        toast.success("Sign Up Successful!");
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="card flex flex-col gap-6 px-10 py-14">
        <div className="flex flex-row justify-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice Job Interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter Your password"
            />

            <Button type="submit" className="btn">
              {type === "signin" ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No Account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/signup" : "/signin"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};
