export type PaymentMethod = "MPESA" | "STRIPE" | "WALLET";

export interface TransactionSummary {
  id: string;
  amount: number;
  type: "DEPOSIT" | "WITHDRAWAL" | "COURSE_PURCHASE";
  status: "COMPLETED" | "PENDING" | "FAILED";
  reference: string;
  createdAt: Date;
}
