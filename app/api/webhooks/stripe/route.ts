import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/services/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const userId = session.metadata?.userId;
    const type = session.metadata?.type; // "COURSE" or "DEPOSIT"
    const targetId = session.metadata?.targetId; // courseId or null

    if (!userId) return new NextResponse("No User ID in metadata", { status: 400 });

    try {
      await prisma.$transaction(async (tx) => {
        if (type === "DEPOSIT") {
          const amount = (session.amount_total || 0) / 100;

          await tx.wallet.update({
            where: { userId },
            data: { balance: { increment: amount } },
          });

          await tx.transaction.create({
            data: {
              wallet: { connect: { userId } },
              amount,
              type: "DEPOSIT",
              provider: "STRIPE",
              status: "COMPLETED",
              reference: session.payment_intent as string,
            },
          });
        }

        if (type === "COURSE" && targetId) {
          await tx.coursePurchase.create({
            data: {
              userId,
              courseId: targetId,
            },
          });
          
          const course = await tx.course.findUnique({ where: { id: targetId }});
          
          await tx.transaction.create({
            data: {
              wallet: { connect: { userId } },
              amount: Number(course?.price || 0),
              type: "COURSE_PURCHASE",
              provider: "STRIPE",
              status: "COMPLETED",
              reference: session.payment_intent as string,
            },
          });
        }
      });
    } catch (error) {
      console.error("Stripe Webhook Processing Error:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
