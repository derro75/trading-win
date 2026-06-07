"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Clock, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function TradePanel({ currentPrice }: { currentPrice: number }) {
  const [amount, setAmount] = useState<string>("10");
  const [timer, setTimer] = useState<string>("1:00");
  const { toast } = useToast();

  const handleTrade = (direction: "HIGHER" | "LOWER") => {
    toast({
      title: "Educational Simulation Active",
      description: `Simulating ${direction} trade for $${amount} at ${currentPrice.toFixed(5)}. Virtual funds used.`,
      variant: direction === "HIGHER" ? "success" : "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-gray-400 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider">Balance</span>
        <div className="flex items-center gap-1 text-white">
          <Wallet size={14} className="text-blue-500" />
          <span className="font-mono">$1,250.00</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Investment Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
            <Input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-[#20283A] border-white/5 pl-7 h-12 text-lg font-bold"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-2 block">Expiration Time</label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="bg-[#20283A] border-white/5 h-12 font-mono">1:00</Button>
            <Button variant="outline" className="border-white/5 h-12 font-mono">5:00</Button>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button 
          onClick={() => handleTrade("HIGHER")}
          className="w-full h-16 bg-green-500 hover:bg-green-600 text-white rounded-xl flex flex-col items-center justify-center gap-0 shadow-lg shadow-green-500/10"
        >
          <TrendingUp size={24} />
          <span className="font-bold text-lg">HIGHER</span>
          <span className="text-[10px] opacity-80">Payout: 82%</span>
        </Button>

        <Button 
          onClick={() => handleTrade("LOWER")}
          className="w-full h-16 bg-red-500 hover:bg-red-600 text-white rounded-xl flex flex-col items-center justify-center gap-0 shadow-lg shadow-red-500/10"
        >
          <TrendingDown size={24} />
          <span className="font-bold text-lg">LOWER</span>
          <span className="text-[10px] opacity-80">Payout: 82%</span>
        </Button>
      </div>

      <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-500/10">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Clock size={14} />
          <span className="text-xs font-bold uppercase">Next Settlement</span>
        </div>
        <p className="text-sm text-gray-400">Markets close in <span className="text-white font-mono">14:22:05</span></p>
      </div>
    </div>
  );
}
