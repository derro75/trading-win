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
import { forgotPassword } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ForgotPasswordFormSchema } from "@/types/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormSchema) => {
    setError(undefined);
    startTransition(async () => {
      const result = await forgotPassword(values);
      if (result?.error) {
        setError(result.error);
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        toast({
          title: "Email Sent",
          description: result.success,
          variant: "success",
        });
        form.reset();
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  );
}
