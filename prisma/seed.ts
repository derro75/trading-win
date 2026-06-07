import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // 1. Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@tagoption.ke" },
    update: {},
    create: {
      email: "admin@tagoption.ke",
      name: "Super Admin",
      password: hashedPassword,
      role: UserRole.ADMIN,
      wallet: {
        create: { balance: 1000000 }
      }
    },
  });

  // 2. Create Demo Courses
  const course1 = await prisma.course.upsert({
    where: { id: "forex-basics-101" },
    update: {},
    create: {
      id: "forex-basics-101",
      title: "Forex Trading Fundamentals",
      description: "Master the basics of currency pairs and market structure.",
      price: 49.99,
      level: "Beginner",
    },
  });

  console.log({ admin, course1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
