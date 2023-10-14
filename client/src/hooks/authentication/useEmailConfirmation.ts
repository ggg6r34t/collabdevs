import axios from "axios";
import { useEffect, useState } from "react";

import { BASE_URL } from "../../api/api";

function useEmailConfirmation(token: string) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/auth/confirm-email/${token}`
        );

        if (response.status === 200) {
          setMessage("Email confirmed successfully.");
        } else {
          setMessage("Error confirming email.");
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred.");
      }
    };

    confirmEmail();
  }, [token]);

  return message;
}

export default useEmailConfirmation;
