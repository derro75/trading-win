import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CourseProgressCard } from "@/components/dashboard/CourseProgressCard";
import { SignalPreview } from "@/components/dashboard/SignalPreview";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Trader!</h1>
          <p className="text-gray-400 mt-1">Here&apos;s what&apos;s happening with your trading education today.</p>
        </div>
        <Link href="/trade">
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2 px-6 h-12 rounded-xl">
            <TrendingUp size={18} />
            Start Simulation
          </Button>
        </Link>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentActivity />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <CourseProgressCard />
             <div className="bg-[#1C2230] rounded-2xl border border-white/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold">Affiliate Program</h3>
                  <p className="text-gray-400 text-sm mt-2">Earn 20% commission on every student you refer to the platform.</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-500">$240.00</span>
                  <Link href="/affiliate">
                    <Button variant="ghost" size="sm" className="text-gray-400 gap-2">
                      View Center <ArrowUpRight size={16} />
                    </Button>
                  </Link>
                </div>
             </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <SignalPreview />
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold">Go Diamond</h3>
            <p className="text-blue-100 text-sm mt-2">Unlock advanced signals and institutional-grade trading courses.</p>
            <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl">
              Upgrade Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
