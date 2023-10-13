import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/api";

export const useResetPassword = (
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) => {
  const [message, setMessage] = useState("");

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password-confirm`,
        { resetToken, newPassword }
      );

      if (response.status === 200) {
        setMessage("Password reset successfully.");
      } else {
        console.error("Password reset failed");
        setMessage("Error resetting password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred.");
    }
  };

  return { message, resetPassword };
};
