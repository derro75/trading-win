import { handleMpesaC2B } from "@/services/mpesa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("M-Pesa Webhook Received:", JSON.stringify(body, null, 2));

    // Process the M-Pesa callback
    const response = await handleMpesaC2B(body);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in M-Pesa webhook:", error);
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: "Internal Server Error" },
      { status: 500 }
    );
  }
}
