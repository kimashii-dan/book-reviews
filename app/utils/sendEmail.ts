import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  console.log(`Attempting to send email to: ${to}`);

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
