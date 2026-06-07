import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const withdrawalSchema = z.object({
  requestId: z.string(),
  status: z.enum(["COMPLETED", "FAILED"]),
});

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const json = await req.json();
    const { requestId, status } = withdrawalSchema.parse(json);

    const withdrawalRequest = await prisma.withdrawalRequest.findUnique({
      where: { id: requestId },
      include: { user: true }
    });

    if (!withdrawalRequest) {
      return new NextResponse("Request not found", { status: 404 });
    }

    if (withdrawalRequest.status !== "PENDING") {
      return new NextResponse("Request already processed", { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Update request status
      const updatedRequest = await tx.withdrawalRequest.update({
        where: { id: requestId },
        data: { status }
      });

      // If failed, refund the wallet
      if (status === "FAILED") {
        await tx.wallet.update({
          where: { userId: withdrawalRequest.userId },
          data: { balance: { increment: withdrawalRequest.amount } }
        });
      }

      // Record the final transaction state
      await tx.transaction.create({
        data: {
          wallet: { connect: { userId: withdrawalRequest.userId } },
          amount: Number(withdrawalRequest.amount),
          type: "WITHDRAWAL",
          provider: withdrawalRequest.method,
          status: status,
          reference: `WITH-FINAL-${requestId}`,
        }
      });

      return updatedRequest;
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
