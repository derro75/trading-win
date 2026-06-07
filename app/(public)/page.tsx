import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, BookOpen, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#13161E] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Learn To Trade Like A <span className="text-blue-500">Professional</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
            Master Forex, Stocks, Crypto, and Investment Education with Expert-Led Training and Community Support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl">
              Start Trading
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[#171B25]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<TrendingUp className="text-blue-500" />}
            title="Forex Education"
            description="Complete curriculum from basic pips to advanced institutional strategies."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-green-500" />}
            title="Trading Signals"
            description="Real-time educational signals from verified master traders."
          />
          <FeatureCard 
            icon={<Users className="text-purple-500" />}
            title="Trading Community"
            description="Share insights and grow with thousands of traders across Kenya."
          />
        </div>
      </section>

      {/* Broker Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted Broker Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 opacity-60">
            {['Exness', 'HFM', 'XM', 'FXPesa', 'Pepperstone'].map((broker) => (
              <div key={broker} className="flex items-center justify-center p-8 bg-[#20283A] rounded-2xl border border-white/5">
                <span className="font-bold text-xl">{broker}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-[#20283A] border-white/5 p-8 hover:border-blue-500/50 transition-all cursor-pointer group">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <Button variant="link" className="text-blue-500 p-0 group-hover:underline">Learn More &rarr;</Button>
    </Card>
  );
}
