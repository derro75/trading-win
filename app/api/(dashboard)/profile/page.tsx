"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Mail, Phone, Calendar, Award, BookOpen } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="h-32 w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-white/5" />
        <div className="absolute -bottom-6 left-8 flex items-end gap-6">
          <Avatar className="h-24 w-24 border-4 border-[#13161E] shadow-xl">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback className="bg-blue-600 text-2xl font-bold">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="pb-2">
            <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 border-blue-500/20">
                {session?.user?.role || "STUDENT"}
              </Badge>
              <span className="text-xs text-gray-500">Joined May 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#171B25] border-white/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-500" />
                Account Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#20283A] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#20283A] rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Phone Identity (KYC)</p>
                    <p className="text-xs text-gray-500">Required for withdrawals</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">Pending</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#171B25] border-white/5 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award size={20} className="text-blue-500" />
                Learning Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#20283A] rounded-xl border border-white/5 text-center">
                  <BookOpen size={24} className="mx-auto text-blue-500 mb-2" />
                  <p className="text-xl font-bold">4</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Courses Completed</p>
                </div>
                <div className="p-4 bg-[#20283A] rounded-xl border border-white/5 text-center">
                  <Calendar size={24} className="mx-auto text-purple-500 mb-2" />
                  <p className="text-xl font-bold">12</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#171B25] border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 bg-blue-600/10 border-b border-white/5">
              <p className="text-xs font-bold text-blue-500 uppercase mb-1">Current Tier</p>
              <h3 className="text-2xl font-black italic">SILVER</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-gray-400">Unlock Gold to get institutional signals and 1-on-1 mentorship.</p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold transition-colors">
                Upgrade Now
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
