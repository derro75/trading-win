import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, Users, ShieldCheck, Info } from "lucide-react";

const masters = [
  { id: 1, name: "David M.", winRate: "82%", roi: "+145%", followers: 1240, risk: "Medium" },
  { id: 2, name: "Sarah K.", winRate: "78%", roi: "+92%", followers: 850, risk: "Low" },
  { id: 3, name: "Brian O.", winRate: "89%", roi: "+310%", followers: 2100, risk: "High" },
];

export default function CopyTradingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3">
        <Info className="text-blue-500 mt-1" size={20} />
        <p className="text-sm text-blue-200/80">
          <strong>Educational Simulator:</strong> Following a trader simulates their trades in your demo account using virtual funds. No real capital is ever at risk. This is for learning strategy replication only.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Masters</h1>
          <p className="text-gray-400">Learn by replicating the strategies of top community performers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {masters.map((master) => (
          <Card key={master.id} className="bg-[#171B25] border-white/5 p-6 rounded-2xl hover:border-blue-500/30 transition-all">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-20 w-20 border-2 border-blue-500/20">
                <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">{master.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h3 className="text-xl font-bold">{master.name}</h3>
                  <ShieldCheck size={18} className="text-blue-500" />
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Users size={14} /> {master.followers} Students</span>
                  <span className="flex items-center gap-1"><TrendingUp size={14} /> {master.winRate} Win Rate</span>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-2xl font-bold text-green-500">{master.roi}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Estimated ROI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button variant="outline" className="border-white/10 rounded-xl">View Journal</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">Copy Strategy (Demo)</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
