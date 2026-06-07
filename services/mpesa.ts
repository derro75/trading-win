import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // Ensure Prisma client is initialized

const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const MPESA_SHORTCODE = process.env.MPESA_SHORTCODE;
const MPESA_PASSKEY = process.env.MPESA_PASSKEY;
const MPESA_CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

export async function getMpesaToken() {
  if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
    throw new Error("M-Pesa consumer key or secret not configured.");
  }
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  
  // Use the correct M-Pesa environment URL (sandbox or production)
  const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get M-Pesa token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function initiateStkPush(phoneNumber: string, amount: number) {
  if (!MPESA_SHORTCODE || !MPESA_PASSKEY || !MPESA_CALLBACK_URL) {
    throw new Error("M-Pesa STK Push configuration missing.");
  }

  const token = await getMpesaToken();
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

  const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "TradingEdu", // This can be dynamic, e.g., userId
      TransactionDesc: "Wallet Deposit",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("M-Pesa STK Push API error:", errorText);
    throw new Error(`M-Pesa STK Push failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Placeholder for M-Pesa C2B (Customer to Business) validation/confirmation
// This would be called by M-Pesa's servers to your webhook URL
export async function handleMpesaC2B(body: any) {
  console.log("Received M-Pesa C2B Callback:", body);

  // Example: Extract relevant data
  const {
    TransactionType,
    TransID,
    TransTime,
    TransAmount,
    BusinessShortCode,
    BillRefNumber, // AccountReference from STK Push
    InvoiceNumber,
    OrgAccountBalance,
    ThirdPartyTransID,
    MSISDN,
    FirstName,
    MiddleName,
    LastName,
  } = body.stkCallback.CallbackMetadata.Item.reduce((acc: any, item: any) => {
    acc[item.Name] = item.Value;
    return acc;
  }, {});

  const checkoutRequestID = body.stkCallback.CheckoutRequestID;
  const resultCode = body.stkCallback.ResultCode;
  const resultDesc = body.stkCallback.ResultDesc;

  try {
    // Find the pending transaction using CheckoutRequestID
    const transaction = await prisma.transaction.findFirst({
      where: {
        reference: checkoutRequestID,
        status: "PENDING",
        provider: "MPESA",
      },
    });

    if (transaction) {
      if (resultCode === 0) {
        // Transaction was successful
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "COMPLETED",
            amount: new Prisma.Decimal(TransAmount), // Update with actual amount from callback
            reference: TransID, // Update reference to actual M-Pesa Transaction ID
          },
        });

        // Update user's wallet balance
        await prisma.wallet.update({
          where: { userId: transaction.walletId }, // Assuming walletId is userId
          data: {
            balance: {
              increment: new Prisma.Decimal(TransAmount),
            },
          },
        });
        console.log(`M-Pesa deposit ${TransID} completed for user ${transaction.walletId}.`);
      } else {
        // Transaction failed or was cancelled
        await prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            status: "FAILED",
            // Optionally store resultDesc
          },
        });
        console.log(`M-Pesa deposit ${checkoutRequestID} failed: ${resultDesc}`);
      }
    } else {
      console.warn(`M-Pesa callback received for unknown or already processed transaction: ${checkoutRequestID}`);
    }
  } catch (error) {
    console.error("Error processing M-Pesa C2B callback:", error);
    // Log error, potentially notify admin
  }

  // M-Pesa expects a specific response format for confirmation
  return {
    ResultCode: 0,
    ResultDesc: "C2B Request Processed Successfully",
  };
}
