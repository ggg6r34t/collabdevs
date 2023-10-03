import axios from "axios";
import { BASE_URL } from "../api/api";

export const useResetPassword = () => {
  const resetPassword = async (resetToken: string, newPassword: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password-confirm`,
        { resetToken, newPassword }
      );

      if (response.status === 200) {
        // Password reset successful
      } else {
        console.error("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return { resetPassword };
};
