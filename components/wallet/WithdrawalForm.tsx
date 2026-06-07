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
import { requestWithdrawal } from "@/actions/wallet";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

const withdrawalFormSchema = z.object({
  amount: z.coerce.number().min(20, { message: "Minimum withdrawal is $20." }),
  method: z.enum(["mpesa", "bank_transfer", "paypal"], {
    required_error: "Please select a withdrawal method.",
  }),
  accountDetails: z.string().min(10, { message: "Please provide account details." }),
});

type WithdrawalFormValues = z.infer<typeof withdrawalFormSchema>;

export function WithdrawalForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: 20,
      method: "mpesa",
      accountDetails: "",
    },
  });

  const selectedMethod = form.watch("method");

  const onSubmit = (values: WithdrawalFormValues) => {
    setError(undefined);
    startTransition(async () => {
      const result = await requestWithdrawal(values);
      if (result?.error) {
        setError(result.error);
        toast({
          title: "Withdrawal Failed",
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        toast({
          title: "Withdrawal Requested",
          description: result.success,
          variant: "success",
        });
        form.reset({ amount: 20, method: values.method, accountDetails: "" });
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
                  placeholder="e.g., 100"
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
              <FormLabel className="text-muted-foreground">Withdrawal Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mpesa" id="mpesa-withdraw" disabled={isPending} />
                    <Label htmlFor="mpesa-withdraw">M-Pesa (Kenya)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank_transfer" id="bank-transfer" disabled={isPending} />
                    <Label htmlFor="bank-transfer">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal-withdraw" disabled={isPending} />
                    <Label htmlFor="paypal-withdraw">PayPal</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                {selectedMethod === "mpesa" && "M-Pesa Number"}
                {selectedMethod === "bank_transfer" && "Bank Account Details (Bank Name, Account No., Swift Code)"}
                {selectedMethod === "paypal" && "PayPal Email Address"}
                {!selectedMethod && "Account Details"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    selectedMethod === "mpesa" ? "e.g., 254712345678" :
                    selectedMethod === "bank_transfer" ? "Bank Name: ABC Bank\nAccount No: 1234567890\nSwift Code: ABCDEFGH" :
                    selectedMethod === "paypal" ? "e.g., yourpaypal@example.com" :
                    "Provide your account details for withdrawal"
                  }
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
          {isPending ? "Submitting Request..." : "Request Withdrawal"}
        </Button>
      </form>
    </Form>
  );
}
