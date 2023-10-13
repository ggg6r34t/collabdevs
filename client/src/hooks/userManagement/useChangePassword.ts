import axios from "axios";

import { useUserSession } from "../authentication/useUserSession";
import { BASE_URL } from "../../api/api";
import { useState } from "react";

const useChangePassword = (
  userId: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const [message, setMessage] = useState("");
  const { getUserSession } = useUserSession();

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      const { token } = getUserSession();
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/${userId}/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password changed successfully.");
      } else {
        console.error("Change password failed");
        setMessage("Error changing password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred.");
    }
  };

  return {
    message,
    changePassword,
  };
};

export default useChangePassword;
