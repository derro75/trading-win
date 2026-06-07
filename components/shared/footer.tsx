import React from "react";
import Link from "next/link";
import { TrendingUp, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F1117] border-t border-white/5 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">TagOption</span>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            Kenya's leading educational simulator for Forex, Stocks, and Digital Assets. Master the markets without the risk.
          </p>
          <div className="flex gap-4">
            <Facebook className="text-gray-600 hover:text-blue-500 cursor-pointer" size={20} />
            <Twitter className="text-gray-600 hover:text-blue-400 cursor-pointer" size={20} />
            <Instagram className="text-gray-600 hover:text-pink-500 cursor-pointer" size={20} />
            <Linkedin className="text-gray-600 hover:text-blue-700 cursor-pointer" size={20} />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Education</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link href="/courses" className="hover:text-blue-500">Basic Forex</Link></li>
            <li><Link href="/courses" className="hover:text-blue-500">Advanced NSE Trading</Link></li>
            <li><Link href="/courses" className="hover:text-blue-500">Crypto Mastery</Link></li>
            <li><Link href="/courses" className="hover:text-blue-500">Risk Management</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link href="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Contact</Link></li>
            <li><Link href="/affiliate" className="hover:text-blue-500">Affiliate Program</Link></li>
            <li><Link href="/legal" className="hover:text-blue-500">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="bg-[#171B25] p-6 rounded-2xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Risk Disclosure</h4>
          <p className="text-[10px] text-gray-600 leading-tight">
            TagOption is an educational platform and simulator. We are NOT a broker or financial advisor. All trades in the simulator use virtual funds. No real money is used or invested in the trading interface.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 pt-10 text-center text-gray-600 text-xs">
        <p>&copy; {new Date().getFullYear()} TagOption Kenya. Designed for the professional Kenyan trader.</p>
      </div>
    </footer>
  );
};

export default Footer;
