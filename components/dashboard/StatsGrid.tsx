import { Card } from "@/components/ui/card";
import { Wallet, BookOpen, Target, Users } from "lucide-react";

const stats = [
  { label: "Wallet Balance", value: "$1,250.00", icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Active Courses", value: "3", icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "Signals Win Rate", value: "72%", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Referral Earnings", value: "$240.00", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-[#171B25] border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
