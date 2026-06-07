import { useState, useEffect } from "react";

export function useMarketData(symbol: string = "EUR/USD") {
  const [price, setPrice] = useState(1.0850);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate market volatility
      const change = (Math.random() - 0.5) * 0.0002;
      setPrice((prev) => {
        const newPrice = prev + change;
        const candle = {
          time: Math.floor(Date.now() / 1000),
          value: newPrice,
        };
        setHistory((h) => [...h.slice(-50), candle]);
        return newPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [symbol]);

  return { price, history };
}
