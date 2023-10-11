import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthToken } from "../../type/types";

const secretKey = process.env.JWT_SECRET as string;

export function useAuthActions() {
  function getTokenExpiration(token: AuthToken): number | null {
    try {
      const decodedToken = jwt.verify(token!, secretKey) as JwtPayload;

      if (decodedToken && typeof decodedToken.exp === "number") {
        return decodedToken.exp;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  }

  function isTokenExpired(
    tokenExpiration: number,
    currentTime: number
  ): boolean {
    return tokenExpiration < currentTime;
  }

  function isSessionCookieExpired(): boolean {
    const sessionCookie = Cookies.get("session");
    return !sessionCookie;
  }

  return {
    getTokenExpiration,
    isTokenExpired,
    isSessionCookieExpired,
  };
}
