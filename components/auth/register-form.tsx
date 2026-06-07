"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { register } from "@/actions/auth";
import { useState, useTransition } from "react";
import { RegisterFormSchema } from "@/types/auth";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\+?\d{10,14}$/, { message: "Invalid phone number format." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormSchema) => {
    setError(undefined); // Clear previous errors
    startTransition(async () => {
      const result = await register(values);
      if (result?.error) {
        setError(result.error);
        toast({
          title: "Registration Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        toast({
          title: "Registration Successful",
          description: result.success,
          variant: "success",
        });
        // Redirection handled by signIn in actions/auth.ts
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-destructive/20 text-destructive p-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  disabled={isPending}
                  className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
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
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  disabled={isPending}
                  className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+254712345678"
                  {...field}
                  disabled={isPending}
                  className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
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
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  disabled={isPending}
                  className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  disabled={isPending}
                  className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
}
