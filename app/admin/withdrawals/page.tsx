import { prisma } from "@/lib/prisma";
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  Smartphone 
} from "lucide-react";
import WithdrawalActionButtons from "@/components/admin/WithdrawalActionButtons";

export default async function AdminWithdrawalsPage() {
  const requests = await prisma.withdrawalRequest.findMany({
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Withdrawal Requests</h1>
        <p className="text-gray-500">Approve or reject pending fund transfers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1C2230] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm uppercase mb-1">Pending Requests</p>
            <p className="text-2xl font-bold">{requests.filter(r => r.status === "PENDING").length}</p>
          </div>
          <Clock className="text-orange-500 opacity-50" size={32} />
        </div>
      </div>

      <div className="bg-[#171B25] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-8 py-5 font-medium">User</th>
                <th className="px-8 py-5 font-medium">Method</th>
                <th className="px-8 py-5 font-medium">Amount</th>
                <th className="px-8 py-5 font-medium">Status</th>
                <th className="px-8 py-5 font-medium">Requested At</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-white/5 transition-all">
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-semibold text-white">{request.user.name}</p>
                      <p className="text-sm text-gray-500 font-mono">{request.user.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {request.method === "MPESA" ? (
                        <Smartphone className="text-green-500" size={16} />
                      ) : (
                        <CreditCard className="text-blue-500" size={16} />
                      )}
                      <span className="text-sm">{request.method}</span>
                    </div>
                    {/* Accessing accountDetails stored as Json */}
                    <p className="text-xs text-gray-500 mt-1">
                      {(request.accountDetails as any)?.phoneNumber || (request.accountDetails as any)?.email}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-lg font-bold text-white">${request.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      request.status === "COMPLETED" ? "bg-green-600/20 text-green-400" :
                      request.status === "FAILED" ? "bg-red-600/20 text-red-400" :
                      "bg-orange-600/20 text-orange-400"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">
                    {request.createdAt.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    {request.status === "PENDING" ? (
                      <WithdrawalActionButtons requestId={request.id} />
                    ) : (
                      <div className="flex justify-end gap-2 text-gray-600">
                        {request.status === "COMPLETED" ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                    )}
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
