"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function getCourses() {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        purchases: {
          where: { userId: userId || "" }, // Only include purchases for the current user
          select: { userId: true },
        },
      },
    });

    // Map courses to include isPurchased status
    const coursesWithPurchaseStatus = courses.map(course => ({
      ...course,
      isPurchased: course.purchases.length > 0,
    }));

    return { courses: coursesWithPurchaseStatus };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { error: "Failed to fetch courses." };
  }
}

export async function getCourseById(courseId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { id: "asc" }, // Order modules
          include: {
            lessons: {
              orderBy: { id: "asc" }, // Order lessons
            },
          },
        },
        purchases: {
          where: { userId: userId || "" },
          select: { userId: true },
        },
      },
    });

    if (!course) {
      return { error: "Course not found." };
    }

    const courseWithPurchaseStatus = {
      ...course,
      isPurchased: course.purchases.length > 0,
    };

    return { course: courseWithPurchaseStatus };
  } catch (error) {
    console.error(`Error fetching course ${courseId}:`, error);
    return { error: "Failed to fetch course details." };
  }
}

export async function purchaseCourse(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "User not authenticated." };
  }
  const userId = session.user.id;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return { error: "Course not found." };
    }

    const userWallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!userWallet || userWallet.balance.lessThan(course.price)) {
      return { error: "Insufficient wallet balance to purchase this course." };
    }

    const existingPurchase = await prisma.coursePurchase.findFirst({
      where: { userId, courseId },
    });

    if (existingPurchase) {
      return { error: "You have already purchased this course." };
    }

    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Deduct from wallet
      await tx.wallet.update({
        where: { userId },
        data: {
          balance: {
            decrement: course.price,
          },
        },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          walletId: userWallet.id,
          amount: new Prisma.Decimal(-course.price.toNumber()), // Negative for deduction
          type: "COURSE_PURCHASE",
          provider: "WALLET",
          status: "COMPLETED",
          reference: `COURSE-${courseId}-${userId}-${Date.now()}`,
        },
      });

      // Create course purchase record
      await tx.coursePurchase.create({
        data: {
          userId,
          courseId,
        },
      });
    });

    return { success: `Course "${course.title}" purchased successfully!` };
  } catch (error) {
    console.error("Error purchasing course:", error);
    return { error: "An unexpected error occurred during course purchase." };
  }
}
