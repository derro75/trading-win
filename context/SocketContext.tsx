"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MarketTick {
  symbol: string;
  price: number;
  change: number;
}

interface LiveTrade {
  user: string;
  amount: number;
  type: 'HIGHER' | 'LOWER';
}

interface SocketContextType {
  ticks: Record<string, MarketTick>;
  liveFeed: LiveTrade[];
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ticks, setTicks] = useState<Record<string, MarketTick>>({});
  const [liveFeed, setLiveFeed] = useState<LiveTrade[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const names = ["Amos", "Sarah", "John", "Fatuma", "Otieno", "Grace", "Brian", "Emma"];

  useEffect(() => {
    setIsConnected(true);

    // Simulate Market Movement
    const marketInterval = setInterval(() => {
      setTicks((prev) => ({
        ...prev,
        "EUR/USD": {
          symbol: "EUR/USD",
          price: 1.0850 + (Math.random() - 0.5) * 0.002,
          change: (Math.random() - 0.5) * 0.1,
        },
        "BTC/USD": {
          symbol: "BTC/USD",
          price: 65000 + (Math.random() - 0.5) * 50,
          change: (Math.random() - 0.5) * 0.5,
        }
      }));
    }, 1000);

    // Simulate Community Activity Feed
    const feedInterval = setInterval(() => {
      const newTrade: LiveTrade = {
        user: names[Math.floor(Math.random() * names.length)],
        amount: [10, 20, 50, 100][Math.floor(Math.random() * 4)],
        type: Math.random() > 0.5 ? 'HIGHER' : 'LOWER',
      };
      setLiveFeed((prev) => [newTrade, ...prev.slice(0, 9)]);
    }, 3000);

    return () => {
      clearInterval(marketInterval);
      clearInterval(feedInterval);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ ticks, liveFeed, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};
