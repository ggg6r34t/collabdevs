import axios from "axios";
import { useEffect, useState } from "react";

import { BASE_URL } from "../../api/api";
import { useAuthStatus } from "../status/useAuthStatus";

function useEmailConfirmation() {
  const [message, setMessage] = useState("");

  const userToken = useAuthStatus();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/auth/confirm-email/${userToken}`
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
  }, [userToken]);

  return message;
}

export default useEmailConfirmation;
