import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const [
      totalUsers,
      totalDeposits,
      totalWithdrawals,
      courseSalesCount,
      revenueData
    ] = await Promise.all([
      prisma.user.count(),
      prisma.transaction.aggregate({
        where: { type: "DEPOSIT", status: "COMPLETED" },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: { type: "WITHDRAWAL", status: "COMPLETED" },
        _sum: { amount: true }
      }),
      prisma.coursePurchase.count(),
      prisma.transaction.aggregate({
        where: { type: "COURSE_PURCHASE", status: "COMPLETED" },
        _sum: { amount: true }
      })
    ]);

    return NextResponse.json({
      totalUsers,
      totalDeposits: totalDeposits._sum.amount || 0,
      totalWithdrawals: totalWithdrawals._sum.amount || 0,
      courseSalesCount,
      totalRevenue: revenueData._sum.amount || 0,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
