import axios from "axios";

/**
 * Generates the OAuth token required for Daraja API requests.
 */
export async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("M-Pesa Auth Error:", error);
    throw new Error("Failed to authenticate with Safaricom");
  }
}

/**
 * Initiates an STK Push (Lipa Na M-Pesa Online).
 */
export async function initiateSTKPush(phoneNumber: string, amount: number, reference: string) {
  const token = await getMpesaToken();
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;
  
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

  const mpesaPhone = phoneNumber.startsWith("0") 
    ? "254" + phoneNumber.slice(1) 
    : phoneNumber.startsWith("+") 
      ? phoneNumber.slice(1) 
      : phoneNumber;

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: mpesaPhone,
    PartyB: shortCode,
    PhoneNumber: mpesaPhone,
    CallBackURL: callbackUrl,
    AccountReference: "TagOptionEdu",
    TransactionDesc: `Course/Deposit Ref: ${reference}`,
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("STK Push Error:", error.response?.data || error.message);
    throw new Error("Failed to initiate M-Pesa payment");
  }
}
