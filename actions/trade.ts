"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const tradeSchema = z.object({
  symbol: z.string(),
  amount: z.number().min(1),
  direction: z.enum(["HIGHER", "LOWER"]),
  entryPrice: z.number(),
  duration: z.number(), // in seconds
});

export async function executeSimulatedTrade(data: z.infer<typeof tradeSchema>) {
  const session = await auth();

  if (!session) {
    return { error: "You must be logged in to trade." };
  }

  const validatedData = tradeSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid trade parameters." };
  }

  const { symbol, amount, direction, entryPrice, duration } = validatedData.data;

  try {
    const userWallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id }
    });

    if (!userWallet || userWallet.balance.lt(amount)) {
      return { error: "Insufficient demo balance." };
    }

    // Process trade simulation logic
    const trade = await prisma.$transaction(async (tx) => {
      // 1. Deduct from demo balance
      await tx.wallet.update({
        where: { userId: session.user.id },
        data: { balance: { decrement: amount } }
      });

      // 2. Create trade record
      return await tx.tradeHistory.create({
        data: {
          userId: session.user.id,
          pair: symbol,
          amount,
          direction,
          result: "PENDING",
          payout: 0, // Calculated upon closure
        }
      });
    });

    revalidatePath("/trade");
    return { success: true, tradeId: trade.id };
  } catch (error) {
    return { error: "Execution failed. Please try again." };
  }
}
