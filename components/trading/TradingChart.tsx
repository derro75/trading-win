"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, ISeriesApi, CandlestickData, Time } from "lightweight-charts";
import { useMarketData } from "@/hooks/useMarketData";

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const { price } = useMarketData("EUR/USD");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9CA3AF",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.03)" },
        horzLines: { color: "rgba(255, 255, 255, 0.03)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      crosshair: {
        vertLine: { labelBackgroundColor: "#3B82F6" },
        horzLine: { labelBackgroundColor: "#3B82F6" },
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#22C55E",
      downColor: "#EF4444",
      borderVisible: false,
      wickUpColor: "#22C55E",
      wickDownColor: "#EF4444",
    });

    seriesRef.current = candlestickSeries;

    // Initial dummy data for visual density
    const initialData: CandlestickData[] = [];
    let t = Math.floor(Date.now() / 1000) - 100 * 60;
    let lastPrice = 1.0850;
    for (let i = 0; i < 100; i++) {
      const open = lastPrice;
      const close = open + (Math.random() - 0.5) * 0.001;
      initialData.push({
        time: t as Time,
        open,
        high: Math.max(open, close) + 0.0002,
        low: Math.min(open, close) - 0.0002,
        close,
      });
      t += 60;
      lastPrice = close;
    }
    candlestickSeries.setData(initialData);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Update chart in real-time based on simulator hook
  useEffect(() => {
    if (seriesRef.current) {
      const timestamp = Math.floor(Date.now() / 1000) as Time;
      // In a real binance/broker scenario, you'd aggregate ticks into a candle
      // Here we simulate a continuous update to the last candle
      seriesRef.current.update({
        time: timestamp,
        open: price - 0.0001,
        high: price + 0.0002,
        low: price - 0.0002,
        close: price,
      });
    }
  }, [price]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-6 z-10 flex items-center gap-4">
        <div className="bg-[#20283A] px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-bold text-white uppercase tracking-wider">EUR/USD • OTC</span>
        </div>
        <span className="text-xl font-mono font-bold text-blue-500">{price.toFixed(5)}</span>
      </div>
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
