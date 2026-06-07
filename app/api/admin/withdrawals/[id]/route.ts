import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const { status } = await req.json(); // APPROVED or REJECTED

  if (session?.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  try {
    const withdrawal = await prisma.withdrawalRequest.update({
      where: { id: params.id },
      data: { status },
      include: { user: { include: { wallet: true } } }
    });

    // If approved, create a transaction record
    if (status === "APPROVED") {
      await prisma.transaction.create({
        data: {
          walletId: withdrawal.user.wallet!.id,
          amount: withdrawal.amount,
          type: "WITHDRAWAL",
          provider: withdrawal.method,
          status: "COMPLETED",
          reference: `WITH-${withdrawal.id}`,
        }
      });
      
      // Note: In production, you'd trigger the actual payment API (M-Pesa B2C) here
    }

    return NextResponse.json(withdrawal);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
