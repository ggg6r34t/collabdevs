import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import { AuthToken } from "../../type/types";

// Function to get the time remaining until token expiration
function getTokenExpiration(token: AuthToken): number | null {
  try {
    const decodedToken: { exp: number } | null = jwt_decode(token!);

    if (decodedToken && typeof decodedToken.exp === "number") {
      return decodedToken.exp;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
}

export function useAuthActions() {
  function isTokenExpired(token: AuthToken, currentTime: number): boolean {
    const tokenExpiration = getTokenExpiration(token);
    return tokenExpiration !== null && tokenExpiration < currentTime;
  }

  function isSessionCookieExpired(): boolean {
    const sessionCookie = Cookies.get("connect.sid");
    return !sessionCookie;
  }

  return {
    getTokenExpiration, // expose the getTokenExpiration function
    isTokenExpired,
    isSessionCookieExpired,
  };
}
