import { useNavigate } from "react-router-dom";

import { useClearUserSession } from "./useClearUserSession";
import { useAuthActions } from "./useAuthActions";
import { useAuthStatus } from "../status/useAuthStatus";
import { useEffect, useCallback } from "react";

const TOKEN_EXPIRATION_CHECK_INTERVAL = 300000;

export const useAutoSignOut = () => {
  const navigate = useNavigate();
  const { clearUserSession } = useClearUserSession();
  const { isTokenExpired, isSessionCookieExpired } = useAuthActions();
  const userToken = useAuthStatus();

  const autoSignOut = useCallback(async () => {
    try {
      if (userToken) {
        const currentTime = Math.floor(Date.now() / 1000); // convert to seconds

        if (isTokenExpired(userToken, currentTime)) {
          console.error("Token is expired.");
          clearUserSession();
          navigate("/signin");
          return;
        }

        if (isSessionCookieExpired()) {
          console.error("Session cookie is expired.");
          clearUserSession();
          navigate("/signin");
          return;
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token is invalid or expired.");
        clearUserSession();
        navigate("/signin");
      } else {
        console.error("Error during sign out:", error);
      }
    }
  }, [
    navigate,
    clearUserSession,
    isTokenExpired,
    isSessionCookieExpired,
    userToken,
  ]);

  useEffect(() => {
    const interval = setInterval(autoSignOut, TOKEN_EXPIRATION_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [autoSignOut]);

  return { autoSignOut };
};
