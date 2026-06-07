import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string, name: string) => {
  await resend.emails.send({
    from: "TagOption <noreply@tagoption.ke>",
    to: email,
    subject: "Welcome to TagOption Kenya!",
    html: `<h1>Hi ${name},</h1><p>Welcome to the premium trading education platform. Get started in the simulator today!</p>`,
  });
};

export const sendWithdrawalNotification = async (email: string, amount: number, status: string) => {
  await resend.emails.send({
    from: "TagOption Billing <billing@tagoption.ke>",
    to: email,
    subject: `Withdrawal ${status}`,
    html: `<p>Your withdrawal request for $${amount} has been ${status.toLowerCase()}.</p>`,
  });
};
