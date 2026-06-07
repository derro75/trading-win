"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  TrendingUp, Zap, ShieldCheck, Earth, Smartphone, 
  MousePointerClick, Wallet, Trophy, Star, Download, 
  ArrowRight, Sun, Flame, BadgeDollarSign, Timer, 
  Banknote, Users, ChartColumn 
} from "lucide-react";

export default function LandingPage() {
  const [btcPrice, setBtcPrice] = useState(43256.78);

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + (Math.random() * 12 - 6));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-brand-dark/85 border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-brand-accent to-[#00d4aa]">
              <TrendingUp className="w-[17px] h-[17px] text-white" />
            </div>
            <span className="text-[17px] font-bold">TagOption</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-[13px] text-gray-400 hover:text-white transition">Features</Link>
            <Link href="#steps" className="text-[13px] text-gray-400 hover:text-white transition">How it Works</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[13px] font-medium text-gray-300">Log in</Link>
            <Link href="/register" className="px-4 py-2 text-[13px] font-semibold bg-brand-accent rounded-lg shadow-lg shadow-blue-500/20 transition hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-center px-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/10 blur-[120px] -z-10 rounded-full" />
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 border border-blue-500/25 bg-blue-500/10 text-brand-accent">
          <Flame size={14} /> 1M+ Active Traders
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Trading Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#00d4aa]">Easy.</span>
        </h1>
        <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10">
          Master the markets with our professional simulator and educational ecosystem. 
          Trade 100+ assets with lightning speed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="px-8 py-4 bg-brand-accent rounded-xl font-bold flex items-center justify-center gap-2">
            Start Trading <ArrowRight size={18} />
          </Link>
          <button className="px-8 py-4 glass rounded-xl font-bold">Try Demo</button>
        </div>
      </section>

      {/* Ticker Section */}
      <div className="border-y border-white/[0.07] bg-white/[0.02] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-12 items-center px-6">
              <TickerItem symbol="BTC" price={btcPrice.toFixed(2)} change="+2.41%" up />
              <TickerItem symbol="ETH" price="2,451.20" change="+1.12%" up />
              <TickerItem symbol="EUR/USD" price="1.0842" change="-0.15%" up={false} />
              <TickerItem symbol="XAU/USD" price="2,031.10" change="+0.88%" up />
              <TickerItem symbol="AAPL" price="175.22" change="+1.05%" up />
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Zap className="text-yellow-500" />} 
            title="Blazing Fast" 
            desc="Execution in under 1 second. No lag, just profit." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-green-500" />} 
            title="Secure" 
            desc="Bank-level encryption for your educational data." 
          />
          <FeatureCard 
            icon={<Users className="text-blue-500" />} 
            title="1M+ Community" 
            desc="Join a global network of professional traders." 
          />
        </div>
      </section>
    </div>
  );
}

function TickerItem({ symbol, price, change, up }: { symbol: string, price: string, change: string, up: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold text-gray-400">{symbol}</span>
      <span className="text-sm font-mono">${price}</span>
      <span className={`text-[11px] font-bold ${up ? 'text-brand-emerald' : 'text-brand-rose'}`}>{change}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-brand-card border border-white/[0.05] hover:border-brand-accent/50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

