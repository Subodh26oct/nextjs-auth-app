
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
export const sendEmail = async ({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
}) => {
  try {
    const mailOptions = {
      from: "subodh261003kumar@gmail.com",
      to: email,
      subject,
      html,
    };

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending email:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Unknown email sending error");
    }
  }
};

// send verification email
export const sendVerificationEmail = async (
  email: string,
  verifyUrl: string
) => {
  return sendEmail({
    email,
    subject: "Verify your email address",
    html: `<p>Welcome! Please click the link below to verify your email:</p>
      <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
      <p>If you did not request this, you can safely ignore this email.</p>`,
  });
};

// send reset password email
export const sendResetPasswordEmail = async (
  email: string,
  resetUrl: string
) => {
  return sendEmail({
    email,
    subject: "Reset your password",
    html: `<p>You requested to reset your password. Click the link below to proceed:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>If you did not request this, you can safely ignore this email.</p>`,
  });
};

// send reverfication email
export const sendReverificationEmail = async (
  email: string,
  verifyUrl: string
) => {
  return sendEmail({
    email,
    subject: "Re-verify your email address",
    html: `<p>You requested to re-verify your email. Click the link below to proceed:</p>
      <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
      <p>If you did not request this, you can safely ignore this email.</p>`,
  });
};
