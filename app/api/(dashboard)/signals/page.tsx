import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Clock, Lock } from "lucide-react";

const signals = [
  {
    id: 1,
    pair: "EUR/USD",
    type: "BUY",
    entry: 1.0850,
    tp: 1.0920,
    sl: 1.0810,
    time: "10 mins ago",
    status: "Active",
    isPremium: false,
  },
  {
    id: 2,
    pair: "XAU/USD (Gold)",
    type: "SELL",
    entry: 2345.50,
    tp: 2320.00,
    sl: 2360.00,
    time: "45 mins ago",
    status: "In Progress",
    isPremium: true,
  },
  {
    id: 3,
    pair: "GBP/JPY",
    type: "BUY",
    entry: 191.20,
    tp: 192.50,
    sl: 190.40,
    time: "2 hours ago",
    status: "Completed",
    isPremium: false,
  }
];

export default function SignalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trading Signals</h1>
          <p className="text-gray-400">High-probability educational setups from our experts.</p>
        </div>
        <div className="flex gap-2 bg-[#1C2230] p-1 rounded-xl border border-white/5">
          <Button variant="ghost" size="sm" className="bg-blue-600 text-white rounded-lg">Active</Button>
          <Button variant="ghost" size="sm" className="text-gray-400">History</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <Card key={signal.id} className="bg-[#171B25] border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            {signal.isPremium && (
              <div className="absolute inset-0 bg-[#13161E]/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center">
                <Lock size={32} className="text-blue-500 mb-4" />
                <h3 className="font-bold text-lg">Premium Signal</h3>
                <p className="text-sm text-gray-400 mt-2 mb-6">Upgrade to Gold Level or higher to unlock institutional signals.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full rounded-xl">Upgrade Now</Button>
              </div>
            )}
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  signal.type === "BUY" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                  {signal.type === "BUY" ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{signal.pair}</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{signal.type} ORDER</p>
                </div>
              </div>
              <Badge variant="outline" className="border-white/10 text-gray-400">
                <Clock size={12} className="mr-1" /> {signal.time}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#1C2230] p-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Entry</p>
                <p className="text-sm font-bold text-white mt-1">{signal.entry}</p>
              </div>
              <div className="bg-[#1C2230] p-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">T-Profit</p>
                <p className="text-sm font-bold text-green-500 mt-1">{signal.tp}</p>
              </div>
              <div className="bg-[#1C2230] p-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold">S-Loss</p>
                <p className="text-sm font-bold text-red-500 mt-1">{signal.sl}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full border-blue-500/20 text-blue-500 hover:bg-blue-500/10 rounded-xl">
              View Analysis
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
