import { useSession } from "next-auth/react";

export const useAuthRole = () => {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const isAffiliate = session?.user?.role === "AFFILIATE";
  const isStudent = session?.user?.role === "STUDENT";

  return {
    role: session?.user?.role,
    isAdmin,
    isAffiliate,
    isStudent,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    user: session?.user,
  };
};
