import dotenv from "dotenv";

import { NotFoundError } from "../helpers/apiError";
import User, { UserDocument } from "../models/User";
import createTransporter from "../utils/createTransporter";

dotenv.config();
const SMTP_EMAIL = process.env.SMTP_EMAIL as string;

// save reset token and expiration
export const saveResetTokenService = async (
  userId: string,
  resetToken: string,
  resetTokenExpiration: Date
): Promise<UserDocument> => {
  try {
    const userById = await User.findByIdAndUpdate(userId, {
      resetToken,
      resetTokenExpiration,
    });
    if (!userById) {
      throw new NotFoundError(`No user found with ID ${userId}`);
    }
    return userById;
  } catch (error) {
    throw error;
  }
};

// update user email confirmation status and token by ID
export const updateEmailConfirmationService = async (
  userId: string,
  isEmailConfirmed: boolean,
  emailConfirmationToken: string | null
): Promise<UserDocument> => {
  try {
    const updateFields = {
      emailConfirmed: isEmailConfirmed,
      emailConfirmationToken: emailConfirmationToken,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields);

    if (!updatedUser) {
      throw new NotFoundError(`No user found with ID: ${userId}`);
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// update the last login timestamp
export const updateLastLoginService = async (
  id: string
): Promise<UserDocument> => {
  try {
    const foundUser = await User.findByIdAndUpdate(id, {
      lastLogin: Date.now(),
    });
    if (!foundUser) {
      throw new NotFoundError(`User with ${id} not found`);
    }
    return foundUser;
  } catch (error) {
    throw error;
  }
};

// update user password by ID
export const updatePasswordService = async (
  userId: string,
  newPassword: string
): Promise<UserDocument> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      password: newPassword,
    });
    if (!updatedUser) {
      throw new NotFoundError(`No user found with ID: ${userId}`);
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// send a password reset email
export const sendResetEmailService = async (
  email: string,
  resetToken: string
): Promise<void> => {
  try {
    const transporter = await createTransporter(); // creates the Nodemailer transporter

    const mailOptions = {
      from: `"CollabDev" <${SMTP_EMAIL}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #0078d4;">Password Reset Request</h2>
          <p>Dear user,</p>
          <p>We received a request to reset your password. To proceed with the password reset, click the button below:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://bucolic-12d61d.netlify.app/auth/reset-password-confirm/${resetToken}" style="background-color: #010536; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          <p>If you didn't make this request, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour hour for security reasons.</p>
          <p>If you encounter any issues, please contact our support team at <a href="mailto:support@collabdev.com">support@collabdev.com</a>.</p>
          <p>With ❤️,<br><br>The Collaborative DevLink Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
