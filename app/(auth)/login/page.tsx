import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13161E] p-4">
      <Card className="w-full max-w-md bg-[#171B25] border-white/5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Welcome Back!</CardTitle>
          <p className="text-muted-foreground text-sm">Sign in to your account to continue learning.</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
