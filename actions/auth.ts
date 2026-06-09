"use server";

import { signIn, signOut } from "next-auth/react";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/types/auth";
import { redirect } from "next/navigation";

// Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\+?\d{10,14}$/, { message: "Invalid phone number format." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  token: z.string(), // Hidden field for the reset token
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});


export async function login(values: LoginFormSchema) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    return { success: "Logged in successfully!" };
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid credentials." };
    }
    // Handle other potential errors like database connection issues
    console.error("Login error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function register(values: RegisterFormSchema) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { fullName, email, phone, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use." };
    }

    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return { error: "Phone number already in use." };
    }

    await prisma.user.create({
      data: {
        name: fullName,
        email,
        phone,
        password: hashedPassword,
        role: "STUDENT", // Default role
      },
    });

    // Optionally, automatically sign in the user after registration
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: "Registration successful!" };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred during registration." };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

export async function forgotPassword(values: ForgotPasswordFormSchema) {
  const validatedFields = forgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email address.", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { email } = validatedFields.data;

  // In a real application, you would:
  // 1. Find the user by email.
  // 2. Generate a unique, time-limited token.
  // 3. Store the token (hashed) and its expiry in the database associated with the user.
  // 4. Send an email to the user with a link containing the token (e.g., /reset-password?token=YOUR_TOKEN).
  // For this educational platform, we'll simulate success.

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // For security, always return a generic success message even if user not found
    return { success: "If an account with that email exists, a password reset link has been sent." };
  }

  // Simulate token generation and email sending
  console.log(`[FORGOT PASSWORD] Sent reset link to ${email}`);
  // In production, use a robust email service and token management
  // const resetToken = generateResetToken();
  // await prisma.passwordResetToken.create({ data: { userId: user.id, token: hash(resetToken), expires: new Date(Date.now() + 3600 * 1000) } });
  // await sendResetPasswordEmail(user.email, resetToken);

  return { success: "If an account with that email exists, a password reset link has been sent." };
}

export async function resetPassword(values: ResetPasswordFormSchema) {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!", issues: validatedFields.error.flatten().fieldErrors };
  }

  const { password, token } = validatedFields.data;

  // In a real application, you would:
  // 1. Verify the token against the database (check expiry and validity).
  // 2. Find the user associated with the token.
  // 3. Hash the new password and update the user's password.
  // 4. Invalidate the token.
  // For this educational platform, we'll simulate success.

  // Simulate token verification and password update
  console.log(`[RESET PASSWORD] Resetting password with token: ${token}`);
  // const validToken = await prisma.passwordResetToken.findUnique({ where: { token: hash(token), expires: { gt: new Date() } } });
  // if (!validToken) return { error: "Invalid or expired token." };
  // const user = await prisma.user.findUnique({ where: { id: validToken.userId } });
  // if (!user) return { error: "User not found." };

  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { password: await bcrypt.hash(password, 10) },
  // });
  // await prisma.passwordResetToken.delete({ where: { id: validToken.id } });

  return { success: "Your password has been reset successfully!" };
}
