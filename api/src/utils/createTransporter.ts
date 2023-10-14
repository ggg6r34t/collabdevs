import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();
const OAuth2 = google.auth.OAuth2;

const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error("Error getting access token:", err);
          reject(err);
        } else {
          console.log("Access token retrieved successfully");
          resolve(token);
        }
      });
    });

    // nodemailer transporter with Gmail as the service provider
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: SMTP_EMAIL, // Gmail email address
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken as string,
      },
    });

    return transporter;
  } catch (error) {
    throw error;
  }
};

export default createTransporter;
