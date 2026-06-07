import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13161E] p-4">
      <Card className="w-full max-w-md bg-[#171B25] border-white/5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Forgot Your Password?</CardTitle>
          <p className="text-muted-foreground text-sm">Enter your email to receive a password reset link.</p>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
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
