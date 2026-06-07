"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Asset {
  symbol: string;
  price: number;
  change: number;
  type: "FOREX" | "CRYPTO" | "STOCK";
}

const MarketTicker = () => {
  const { lastJsonMessage } = useSocket();
  const [assets, setAssets] = useState<Asset[]>([
    { symbol: "EURUSD", price: 1.0842, change: +0.02, type: "FOREX" },
    { symbol: "GBPUSD", price: 1.2631, change: -0.15, type: "FOREX" },
    { symbol: "BTCUSD", price: 64231.5, change: +2.4, type: "CRYPTO" },
    { symbol: "XAUUSD", price: 2164.2, change: +0.42, type: "STOCK" },
    { symbol: "NSE20", price: 1542.0, change: -0.05, type: "STOCK" },
  ]);

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.type === "MARKET_UPDATE") {
      setAssets((prev) => 
        prev.map((asset) => 
          asset.symbol === lastJsonMessage.symbol 
            ? { ...asset, price: lastJsonMessage.price, change: lastJsonMessage.change } 
            : asset
        )
      );
    }
  }, [lastJsonMessage]);

  return (
    <div className="w-full bg-[#171B25] border-y border-white/5 overflow-hidden h-12 flex items-center">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...assets, ...assets].map((asset, idx) => (
          <div key={idx} className="flex items-center gap-3 px-8 border-r border-white/5 group">
            <span className="text-gray-400 font-bold text-xs group-hover:text-blue-500 transition-colors">
              {asset.symbol}
            </span>
            <span className="text-sm font-mono font-semibold">
              {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <div className={`flex items-center text-[10px] font-bold ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {asset.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {Math.abs(asset.change)}%
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;
