"use client";

import { useState, useEffect } from "react";
import { TradingChart } from "@/components/trading/TradingChart";
import { MarketTicker } from "@/components/trading/MarketTicker";
import { TradePanel } from "@/components/trading/TradePanel";
import { Card } from "@/components/ui/card";
import { useMarketData } from "@/hooks/useMarketData";

export default function TradePage() {
  const { price } = useMarketData("EUR/USD");
  const [history, setHistory] = useState<any[]>([]);

  // Simulated live feed of other "traders"
  const names = ["Peter", "Rachel", "Emma", "James", "Kevin", "Sarah"];
  const [liveTrades, setLiveTrades] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade = {
        id: Math.random(),
        name: names[Math.floor(Math.random() * names.length)],
        amount: [10, 50, 100, 200][Math.floor(Math.random() * 4)],
        type: Math.random() > 0.5 ? "Higher" : "Lower",
        time: "Just now"
      };
      setLiveTrades(prev => [newTrade, ...prev.slice(0, 5)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-[#13161E] flex flex-col">
      <MarketTicker />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Main Chart Area */}
        <div className="flex-1 relative p-4">
          <div className="h-full bg-[#171B25] rounded-2xl border border-white/5 overflow-hidden">
            <TradingChart />
          </div>
        </div>

        {/* Right Sidebar: Trade Panel */}
        <div className="w-[350px] border-l border-white/5 bg-[#171B25] p-6 space-y-6 overflow-y-auto">
          <TradePanel currentPrice={price} />
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Live Community Activity</h3>
            {liveTrades.map((trade) => (
              <div key={trade.id} className="flex items-center justify-between p-3 bg-[#20283A] rounded-xl text-sm animate-in fade-in slide-in-from-right-4">
                <div>
                  <p className="font-medium">{trade.name}</p>
                  <p className="text-xs text-gray-500">{trade.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${trade.amount}</p>
                  <p className={trade.type === 'Higher' ? 'text-green-500' : 'text-red-500'}>{trade.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
