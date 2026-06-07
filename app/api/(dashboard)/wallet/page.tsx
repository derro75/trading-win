import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepositForm } from "@/components/wallet/DepositForm";
import { WithdrawalForm } from "@/components/wallet/WithdrawalForm";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { DollarSign, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function WalletPage() {
  // In a real app, fetch wallet balance and transactions from a server action/API
  const walletBalance = "1,250.00";
  const totalDeposits = "5,000.00";
  const totalWithdrawals = "3,750.00";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold">My Wallet</h1>
      <p className="text-gray-400">Manage your funds, deposits, and withdrawals.</p>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Current Balance</p>
            <p className="text-2xl font-bold mt-1">${walletBalance}</p>
          </div>
        </Card>
        <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
            <ArrowDownCircle size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Deposits</p>
            <p className="text-2xl font-bold mt-1">${totalDeposits}</p>
          </div>
        </Card>
        <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/10 text-red-500">
            <ArrowUpCircle size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Withdrawals</p>
            <p className="text-2xl font-bold mt-1">${totalWithdrawals}</p>
          </div>
        </Card>
      </div>

      {/* Deposit/Withdrawal Tabs */}
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#1C2230] border-white/5">
          <TabsTrigger value="deposit" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm">Deposit Funds</TabsTrigger>
          <TabsTrigger value="withdraw" className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm">Withdraw Funds</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit" className="mt-6">
          <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Make a Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <DepositForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="withdraw" className="mt-6">
          <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Request a Withdrawal</CardTitle>
            </CardHeader>
            <CardContent>
              <WithdrawalForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      <Card className="bg-[#171B25] border-white/5 p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionHistory />
        </CardContent>
      </Card>
    </div>
  );
}
