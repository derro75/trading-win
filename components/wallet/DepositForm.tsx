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
import { useState, useTransition } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { depositFunds } from "@/actions/wallet";

const depositFormSchema = z.object({
  amount: z.coerce.number().min(10, { message: "Minimum deposit is $10." }),
  method: z.enum(["mpesa", "stripe", "paypal"], {
    required_error: "Please select a payment method.",
  }),
  phoneNumber: z.string().optional(), // Required for Mpesa
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

export function DepositForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      amount: 10,
      method: "mpesa",
      phoneNumber: "",
    },
  });

  const selectedMethod = form.watch("method");

  const onSubmit = (values: DepositFormValues) => {
    setError(undefined);
    startTransition(async () => {
      const result = await depositFunds(values);
      if (result?.error) {
        setError(result.error);
        toast({
          title: "Deposit Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        toast({
          title: "Deposit Initiated",
          description: result.success,
          variant: "success",
        });
        form.reset({ amount: 10, method: values.method, phoneNumber: "" });
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Amount ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 50"
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
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-muted-foreground">Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mpesa" id="mpesa" disabled={isPending} />
                    <Label htmlFor="mpesa">M-Pesa (Kenya)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stripe" id="stripe" disabled={isPending} />
                    <Label htmlFor="stripe">Stripe (Cards)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" disabled={isPending} />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedMethod === "mpesa" && (
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">M-Pesa Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="e.g., 254712345678"
                    {...field}
                    disabled={isPending}
                    className="bg-[#252E43] border-white/10 text-white placeholder:text-muted-foreground focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Processing..." : "Deposit Funds"}
        </Button>
      </form>
    </Form>
  );
}
