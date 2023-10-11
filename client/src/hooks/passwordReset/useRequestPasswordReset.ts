import axios from "axios";
import { BASE_URL } from "../../api/api";

export const useRequestPasswordReset = () => {
  const requestPasswordReset = async (email: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password`,
        {
          email,
        }
      );

      if (response.status === 200) {
        // password reset request successful
      } else {
        console.error("Password reset request failed");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
  };

  return { requestPasswordReset };
};
