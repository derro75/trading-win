import { z } from "zod";
import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "@prisma/client";

/**
 * Reset Password Validation Schema
 * Used by the Reset Password Form and the Server Action
 */
export const ResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

// Type inference for the form
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordFormSchema>;

/**
 * NextAuth Type Augmentation
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}
