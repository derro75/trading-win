import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#13161E] p-4">
        <Card className="w-full max-w-md bg-[#171B25] border-white/5 shadow-lg text-center p-8">
          <CardTitle className="text-2xl font-bold text-white mb-4">Invalid Link</CardTitle>
          <p className="text-muted-foreground">
            The password reset link is missing or invalid. Please request a new one.
          </p>
          <Link href="/forgot-password" className="text-primary hover:underline mt-4 block">
            Request New Link
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13161E] p-4">
      <Card className="w-full max-w-md bg-[#171B25] border-white/5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Reset Your Password</CardTitle>
          <p className="text-muted-foreground text-sm">Enter your new password below.</p>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
