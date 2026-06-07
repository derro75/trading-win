"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wallet, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  LineChart
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: LineChart, label: "Trade Room", href: "/trade" },
  { icon: Wallet, label: "My Wallet", href: "/wallet" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Zap, label: "Signals", href: "/signals" },
  { icon: Users, label: "Affiliate", href: "/affiliate" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen bg-[#171B25] border-r border-white/5 flex flex-col transition-all duration-300 relative z-50",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <span className="text-xl font-bold text-blue-500 tracking-tighter">TAG OPTION</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-blue-600/10 text-blue-500" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={22} className={cn(isActive ? "text-blue-500" : "group-hover:text-white")} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Button 
          variant="ghost" 
          onClick={() => logout()}
          className="w-full flex items-center justify-start gap-3 text-gray-400 hover:text-red-500 hover:bg-red-500/10"
        >
          <LogOut size={22} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
