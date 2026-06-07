import { UserRole } from "@prisma/client";

export interface SafeUser {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  image?: string | null;
  createdAt: string;
}

export type UserWithWallet = SafeUser & {
  wallet: {
    balance: number;
  } | null;
};
