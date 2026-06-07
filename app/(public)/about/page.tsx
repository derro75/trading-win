import { Metadata } from "next";
import { Shield, BookOpen, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | TagOption Education",
  description: "Empowering Kenyan traders with world-class financial literacy.",
};

export default function AboutPage() {
  const stats = [
    { label: "Students Trained", value: "10k+", icon: Users },
    { label: "Course Modules", value: "150+", icon: BookOpen },
    { label: "Regulated Partners", value: "5+", icon: Shield },
    { label: "Global Reach", value: "24/7", icon: Globe },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Our Mission: <span className="text-blue-500">Financial Literacy</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          TagOption Education is Kenya's premier simulation-first platform. We bridge the gap between complex global markets and local aspiring investors through high-fidelity tools and community-driven learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1C2230] p-8 rounded-2xl border border-white/5 text-center hover:border-blue-500/50 transition-colors">
            <stat.icon className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
            <p className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#171B25] p-12 rounded-3xl border border-white/10">
        <h2 className="text-3xl font-bold mb-8">Why TagOption?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">The Simulation Edge</h3>
            <p className="text-gray-400">We don't just teach theory. Our real-time proprietary simulation engine allows users to experience market volatility without financial risk, using live price feeds from global liquidity providers.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Localized Learning</h3>
            <p className="text-gray-400">From the Nairobi Securities Exchange (NSE) to the NYSE, our curriculum is tailored for the Kenyan context, including integrated local payment systems like M-Pesa for accessibility.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
