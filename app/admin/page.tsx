"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, DollarSign, AlertCircle } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts"; // install recharts

const data = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 2000 },
  { name: "Thu", revenue: 2780 },
  { name: "Fri", revenue: 1890 },
  { name: "Sat", revenue: 2390 },
  { name: "Sun", revenue: 3490 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Admin Command Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#171B25] border-white/5">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">1,284</h3>
              </div>
              <Users className="text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#171B25] border-white/5">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Course Sales</p>
                <h3 className="text-2xl font-bold mt-1">$12,450</h3>
              </div>
              <DollarSign className="text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#171B25] border-white/5 border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Pending Withdrawals</p>
                <h3 className="text-2xl font-bold mt-1">14</h3>
              </div>
              <AlertCircle className="text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-[#171B25] border-white/5 p-6">
          <CardTitle className="mb-6">Revenue Analytics</CardTitle>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252E43" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1C2230", border: "none", borderRadius: "8px" }}
                  itemStyle={{ color: "#3B82F6" }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-[#171B25] border-white/5 p-6">
          <CardTitle className="mb-6">Withdrawal Queue</CardTitle>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#20283A] rounded-xl border border-white/5">
                <div>
                  <p className="text-sm font-bold">User #{i}342</p>
                  <p className="text-xs text-gray-500">M-Pesa • $150.00</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/10">Deny</Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
