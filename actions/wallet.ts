"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { initiateStkPush } from "@/services/mpesa"; // Assuming this is implemented
import { redirect } from "next/navigation";

// Zod schemas for validation
const depositFormSchema = z.object({
  amount: z.coerce.number().min(10, { message: "Minimum deposit is $10." }),
  method: z.enum(["mpesa", "stripe", "paypal"], {
    required_error: "Please select a payment method.",
  }),
  phoneNumber: z.string().optional(), // Required for Mpesa
});

const withdrawalFormSchema = z.object({
  amount: z.coerce.number().min(20, { message: "Minimum withdrawal is $20." }),
  method: z.enum(["mpesa", "bank_transfer", "paypal"], {
    required_error: "Please select a withdrawal method.",
  }),
  accountDetails: z.string().min(10, { message: "Please provide account details." }),
});

export async function depositFunds(values: z.infer<typeof depositFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "User not authenticated." };
  }

  const validatedFields = depositFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { amount, method, phoneNumber } = validatedFields.data;
  const userId = session.user.id;

  try {
    let transactionReference = `DEP-${Date.now()}-${userId.substring(0, 4)}`;

    if (method === "mpesa") {
      if (!phoneNumber) {
        return { error: "Phone number is required for M-Pesa deposits." };
      }
      // Initiate M-Pesa STK Push
      const mpesaResponse = await initiateStkPush(phoneNumber, amount);

      if (mpesaResponse.ResponseCode === "0") {
        // STK Push initiated successfully, create pending transaction
        await prisma.transaction.create({
          data: {
            wallet: { connect: { userId } },
            amount: new Prisma.Decimal(amount),
            type: "DEPOSIT",
            provider: "MPESA",
            status: "PENDING",
            reference: mpesaResponse.CheckoutRequestID || transactionReference, // Use Mpesa's ID if available
          },
        });
        return { success: "M-Pesa STK Push initiated. Please complete the transaction on your phone." };
      } else {
        console.error("M-Pesa STK Push failed:", mpesaResponse);
        return { error: mpesaResponse.ResponseDescription || "Failed to initiate M-Pesa STK Push." };
      }
    } else if (method === "stripe") {
      // In a real app, you'd create a Stripe Checkout Session here
      // For now, simulate success and create a pending transaction
      await prisma.transaction.create({
        data: {
          wallet: { connect: { userId } },
          amount: new Prisma.Decimal(amount),
          type: "DEPOSIT",
          provider: "STRIPE",
          status: "PENDING", // Will be updated by webhook
          reference: transactionReference,
        },
      });
      return { success: "Stripe payment initiated. Redirecting to payment gateway..." };
      // In production, you would return a redirect URL to Stripe Checkout
    } else if (method === "paypal") {
      // Similar to Stripe, initiate PayPal payment
      await prisma.transaction.create({
        data: {
          wallet: { connect: { userId } },
          amount: new Prisma.Decimal(amount),
          type: "DEPOSIT",
          provider: "PAYPAL",
          status: "PENDING", // Will be updated by webhook
          reference: transactionReference,
        },
      });
      return { success: "PayPal payment initiated. Redirecting to PayPal..." };
      // In production, you would return a redirect URL to PayPal
    }

    return { error: "Unsupported payment method." };

  } catch (error) {
    console.error("Deposit error:", error);
    return { error: "An unexpected error occurred during deposit." };
  }
}

export async function requestWithdrawal(values: z.infer<typeof withdrawalFormSchema>) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "User not authenticated." };
  }

  const validatedFields = withdrawalFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { amount, method, accountDetails } = validatedFields.data;
  const userId = session.user.id;

  try {
    const userWallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!userWallet || userWallet.balance.lessThan(amount)) {
      return { error: "Insufficient balance for withdrawal." };
    }

    // Create a withdrawal request
    await prisma.withdrawalRequest.create({
      data: {
        userId,
        amount: new Prisma.Decimal(amount),
        method,
        accountDetails: accountDetails as any, // Prisma handles JSON type
        status: "PENDING",
      },
    });

    // In a real system, you might deduct the amount from the wallet immediately
    // or only after the withdrawal is approved by an admin.
    // For now, we'll just create the request.

    return { success: "Withdrawal request submitted successfully. It will be processed shortly." };
  } catch (error) {
    console.error("Withdrawal request error:", error);
    return { error: "An unexpected error occurred while submitting withdrawal request." };
  }
}
