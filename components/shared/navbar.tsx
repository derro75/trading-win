"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { 
  TrendingUp, 
  Menu, 
  X, 
  User as UserIcon, 
  LayoutDashboard, 
  Wallet, 
  LogOut 
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#13161E]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <TrendingUp className="text-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">
            TAG<span className="text-blue-500">OPTION</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                pathname === link.href ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="bg-[#1C2230] hover:bg-[#252E43] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-white">Login</Link>
              <Link 
                href="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-600/20 transition-all"
              >
                Start Trading
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#171B25] border-b border-white/5 px-4 py-8 space-y-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="block text-xl font-bold" 
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
            {!session ? (
              <>
                <Link href="/login" className="text-center font-bold">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white text-center py-4 rounded-xl font-black">Join Now</Link>
              </>
            ) : (
              <Link href="/dashboard" className="bg-blue-600 text-white text-center py-4 rounded-xl font-black">Go to Dashboard</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
