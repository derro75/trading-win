import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { auth } from "@/lib/auth"; // Temporarily comment this out

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TagOption | Trading Education",
  description: "Master the markets",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. MOCK THE SESSION
  // Instead of calling the database/auth, provide a dummy object
  const session = {
    user: {
      name: "Guest Trader",
      role: "STUDENT",
    }
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#13161E] text-white antialiased`}>
        {/* Wrap in providers, but ensure providers don't call DB on init */}
        {children}
      </body>
    </html>
  );
}
