import axios from "axios";
import { useState } from "react";

import { BASE_URL } from "../../api/api";

export const useRequestPasswordReset = (email: string) => {
  const [message, setMessage] = useState("");

  const requestPasswordReset = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password`,
        {
          email,
        }
      );

      if (response.status === 200) {
        setMessage("Reset email sent successfully.");
      } else {
        console.error("Password reset request failed");
        setMessage("Error sending reset email.");
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      setMessage("An error occurred.");
    }
  };

  return { message, requestPasswordReset };
};
