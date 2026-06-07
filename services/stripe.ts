import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10", // Using modern stable API
  typescript: true,
});

export const createStripeCheckoutSession = async (
  userId: string,
  email: string,
  amount: number,
  type: "COURSE" | "DEPOSIT",
  targetId?: string
) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: type === "COURSE" ? "Trading Course Access" : "Wallet Deposit",
            description: "Premium Education Tier Access",
          },
          unit_amount: amount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      type,
      targetId: targetId || "",
    },
    customer_email: email,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=cancelled`,
  });
};
