import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ShieldCheck, 
  UserPlus 
} from "lucide-react";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string; role?: string };
}) {
  const query = searchParams.q || "";
  const roleFilter = searchParams.role as UserRole | undefined;

  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        },
        roleFilter ? { role: roleFilter } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    include: { wallet: true },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage all registered students, affiliates, and admins.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl flex items-center gap-2 transition-all">
          <UserPlus size={18} />
          Invite Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1C2230] border border-white/5 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="bg-[#1C2230] border border-white/5 p-6 rounded-2xl">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Active Students</p>
          <p className="text-2xl font-bold">{users.filter(u => u.role === "STUDENT").length}</p>
        </div>
      </div>

      <div className="bg-[#171B25] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              className="w-full bg-[#1C2230] border border-white/10 rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-blue-500 transition-all" 
              placeholder="Search by name or email..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select className="bg-[#1C2230] border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none">
              <option value="">All Roles</option>
              <option value="STUDENT">Student</option>
              <option value="AFFILIATE">Affiliate</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-8 py-5 font-medium">User</th>
                <th className="px-8 py-5 font-medium">Role</th>
                <th className="px-8 py-5 font-medium">Wallet Bal</th>
                <th className="px-8 py-5 font-medium">Joined</th>
                <th className="px-8 py-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold border border-blue-500/10">
                        {user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "ADMIN" ? "bg-purple-600/20 text-purple-400" : 
                      user.role === "AFFILIATE" ? "bg-blue-600/20 text-blue-400" : 
                      "bg-green-600/20 text-green-400"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 font-mono text-sm">
                    ${user.wallet?.balance.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-gray-500 hover:text-white transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
