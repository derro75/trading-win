"use client";

import { useSession } from "next-auth/react";
import { Bell, Search, Wallet as WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="h-20 border-b border-white/5 bg-[#13161E]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-[#1C2230] px-4 py-2 rounded-xl border border-white/5 w-96">
        <Search size={18} className="text-gray-500" />
        <input 
          placeholder="Search markets, courses, signals..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-blue-600/10 px-4 py-2 rounded-xl border border-blue-500/20">
          <WalletIcon size={18} className="text-blue-500" />
          <span className="text-sm font-bold text-white">$1,250.00</span>
        </div>

        <Button variant="ghost" size="icon" className="relative text-gray-400">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#13161E]"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all">
              <Avatar className="h-10 w-10 border border-white/10">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-blue-600 text-white font-bold">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-white leading-none">{session?.user?.name}</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">{session?.user?.role?.toLowerCase() || "Student"}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1C2230] border-white/10 text-white">
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Verification Status</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-500">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
