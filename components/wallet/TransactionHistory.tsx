import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

const dummyTransactions = [
  {
    id: "txn_001",
    type: "DEPOSIT",
    amount: 500.00,
    provider: "MPESA",
    status: "COMPLETED",
    date: "2024-05-28 10:30 AM",
  },
  {
    id: "txn_002",
    type: "COURSE_PURCHASE",
    amount: -50.00,
    provider: "WALLET",
    status: "COMPLETED",
    date: "2024-05-27 03:15 PM",
  },
  {
    id: "txn_003",
    type: "WITHDRAWAL",
    amount: -100.00,
    provider: "MPESA",
    status: "PENDING",
    date: "2024-05-26 11:00 AM",
  },
  {
    id: "txn_004",
    type: "DEPOSIT",
    amount: 100.00,
    provider: "STRIPE",
    status: "COMPLETED",
    date: "2024-05-25 09:00 AM",
  },
  {
    id: "txn_005",
    type: "TRADE_PROFIT",
    amount: 25.50,
    provider: "SIMULATOR",
    status: "COMPLETED",
    date: "2024-05-24 02:00 PM",
  },
];

export function TransactionHistory() {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-b border-white/10">
            <TableHead className="text-muted-foreground">ID</TableHead>
            <TableHead className="text-muted-foreground">Type</TableHead>
            <TableHead className="text-muted-foreground">Amount</TableHead>
            <TableHead className="text-muted-foreground">Provider</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyTransactions.map((transaction) => (
            <TableRow key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
              <TableCell className="font-medium text-white">{transaction.id}</TableCell>
              <TableCell className="text-gray-300">{transaction.type}</TableCell>
              <TableCell className={
                transaction.amount > 0 ? "text-green-500 font-semibold" : "text-red-500 font-semibold"
              }>
                {transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-gray-300">{transaction.provider}</TableCell>
              <TableCell>
                <Badge
                  className={
                    transaction.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/20"
                      : transaction.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                      : "bg-red-500/20 text-red-400 hover:bg-red-500/20"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-400 text-sm">{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
