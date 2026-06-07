import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13161E] p-4">
      <Card className="w-full max-w-md bg-[#171B25] border-white/5 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">Create an Account</CardTitle>
          <p className="text-muted-foreground text-sm">Join our community and start your trading journey.</p>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
