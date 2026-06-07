import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";

const activities = [
  { id: 1, type: "Trade", pair: "EUR/USD", result: "WIN", amount: "+$45.00", date: "2 mins ago" },
  { id: 2, type: "Deposit", pair: "M-Pesa", result: "COMPLETE", amount: "+$500.00", date: "4 hours ago" },
  { id: 3, type: "Course", pair: "Price Action Mastery", result: "UNLOCKED", amount: "SILVER", date: "1 day ago" },
];

export function RecentActivity() {
  return (
    <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        <button className="text-xs text-blue-500 font-medium hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-[#1C2230] rounded-xl border border-white/5 transition-hover hover:border-blue-500/30">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                item.type === 'Trade' ? 'bg-green-500/10 text-green-500' : 
                item.type === 'Deposit' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'
              }`}>
                {item.type === 'Trade' ? <ArrowUpRight size={18} /> : 
                 item.type === 'Deposit' ? <ArrowDownLeft size={18} /> : <ShieldCheck size={18} />}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.pair}</p>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">{item.type} • {item.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${item.amount.startsWith('+') ? 'text-green-500' : 'text-gray-300'}`}>
                {item.amount}
              </p>
              <p className="text-[10px] text-gray-500 font-bold">{item.result}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
