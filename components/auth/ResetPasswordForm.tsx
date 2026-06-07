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
import { resetPassword } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ResetPasswordFormSchema } from "@/types/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  token: z.string(), // Hidden field for the reset token
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export function ResetPasswordForm({ token }: { token: string }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token, // Pre-fill the token from props
    },
  });

  const onSubmit = (values: ResetPasswordFormSchema) => {
    setError(undefined);
    startTransition(async () => {
      const result = await resetPassword(values);
      if (result?.error) {
        setError(result.error);
        toast({
          title: "Password Reset Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        toast({
          title: "Password Reset Successful",
          description: result.success,
          variant: "success",
        });
        form.reset();
        router.push("/login"); // Redirect to login after successful reset
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">New Password</FormLabel>
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
              <FormLabel className="text-muted-foreground">Confirm New Password</FormLabel>
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
        {/* Hidden field for the token */}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
