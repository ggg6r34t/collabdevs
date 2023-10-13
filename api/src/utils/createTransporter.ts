import nodemailer from "nodemailer";

const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
const SMTP_PASS = process.env.SMTP_PASS as string;

// nodemailer transporter with Gmail as the service provider
function createTransporter() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: process.env.NODE_ENV === "production",
    auth: {
      type: "login",
      user: SMTP_EMAIL, // Gmail email address
      pass: SMTP_PASS, // app-specific password (recommended for security)
    },
  });

  return transporter;
}

export default createTransporter;
