import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication | TagOption Education",
  description: "Secure access to Kenya's leading trading education platform.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#13161E] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      
      <main className="w-full max-w-md z-10">
        <div className="bg-[#171B25] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          {children}
        </div>
      </main>
      
      <footer className="mt-8 text-gray-500 text-xs text-center z-10">
        &copy; {new Date().getFullYear()} TagOption Education. All rights reserved. <br />
        Trading involves risk. For educational purposes only.
      </footer>
    </div>
  );
}
