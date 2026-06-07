"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Users, DollarSign, BarChart3, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AffiliatePage() {
  const { toast } = useToast();
  const referralLink = "https://tagoption.ke/register?ref=TRADER77";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Copied!", description: "Referral link copied to clipboard." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Affiliate Center</h1>
        <p className="text-gray-400">Grow the community and earn commission on education referrals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users />} label="Total Referrals" value="124" color="text-blue-500" />
        <StatCard icon={<BarChart3 />} label="Conversion Rate" value="12.5%" color="text-green-500" />
        <StatCard icon={<DollarSign />} label="Unpaid Commission" value="$420.00" color="text-yellow-500" />
      </div>

      <Card className="bg-[#171B25] border-white/5 p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-bold">Your Referral Link</h3>
            <p className="text-gray-400 text-sm">Share this link to earn 20% on every course purchase made by your referrals.</p>
            <div className="flex items-center gap-2 bg-[#13161E] p-2 rounded-xl border border-white/5">
              <LinkIcon className="ml-2 text-gray-500" size={18} />
              <code className="flex-1 text-sm text-blue-400 truncate">{referralLink}</code>
              <Button onClick={copyToClipboard} size="sm" variant="secondary" className="gap-2">
                <Copy size={14} /> Copy
              </Button>
            </div>
          </div>
          <div className="w-full md:w-64 bg-blue-600/10 p-6 rounded-2xl border border-blue-500/20 text-center">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Affiliate Level</p>
            <p className="text-2xl font-black text-white italic">SILVER PRO</p>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-500 h-full w-[65%]"></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">16 more to GOLD</p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#171B25] border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-bold">Recent Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-500 uppercase text-[10px] font-bold bg-white/2">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Commission</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <ReferralRow user="Mike Omondi" status="Bronze Level" commission="$10.00" date="2h ago" />
              <ReferralRow user="Jane Wanjiku" status="Gold Level" commission="$40.00" date="1d ago" />
              <ReferralRow user="Kevin Koech" status="Pending" commission="$0.00" date="3d ago" />
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </Card>
  );
}

function ReferralRow({ user, status, commission, date }: any) {
  return (
    <tr className="hover:bg-white/2 transition-colors">
      <td className="px-6 py-4 font-medium text-white">{user}</td>
      <td className="px-6 py-4"><span className="text-blue-500 bg-blue-500/10 px-2 py-1 rounded text-[10px] font-bold">{status}</span></td>
      <td className="px-6 py-4 text-green-500 font-mono font-bold">{commission}</td>
      <td className="px-6 py-4 text-gray-500">{date}</td>
    </tr>
  );
}
