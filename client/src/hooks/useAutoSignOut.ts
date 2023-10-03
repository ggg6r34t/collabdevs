import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

import { BASE_URL } from "../api/api";
import { RootState } from "../redux/store";
import { useClearUserSession } from "./useClearUserSession";

export const useAutoSignOut = () => {
  const userToken = useSelector((state: RootState) => state.user.token);

  const navigate = useNavigate();

  // useClearUserSession hook to get the clearUserSession function
  const { clearUserSession } = useClearUserSession();

  // Function to decode a JWT token and retrieve the expiration time
  const getTokenExpiration = (token: string) => {
    try {
      const decodedToken = jwt.decode(token) as JwtPayload; // Use type assertion

      if (decodedToken && typeof decodedToken.exp === "number") {
        return decodedToken.exp; // This should contain the token expiration time in Unix timestamp format
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    return null;
  };

  const autoSignOut = async () => {
    try {
      if (userToken) {
        const tokenExpiration = getTokenExpiration(userToken); // Get the token expiration

        const currentTime = Math.floor(Date.now() / 1000);

        if (tokenExpiration && tokenExpiration < currentTime) {
          console.error("Token is expired.");

          // clear user session (token, cookies, etc.)
          clearUserSession();

          navigate("/signin");
          return; // exit the function
        }

        // check if the session cookie has expired
        const isSessionCookieExpired = () => {
          const sessionCookie = Cookies.get("session"); // session cookie name
          return !sessionCookie; // check if the cookie is not present
        };

        // perform the session cookie check
        if (isSessionCookieExpired()) {
          console.error("Session cookie is expired.");

          // clear user session (token, cookies, etc.)
          clearUserSession();

          navigate("/signin");
          return; // exit the function
        }

        // token is expired, proceed with sign-out
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/autoSignout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 200) {
          // clear user session (token, cookies, etc.)
          clearUserSession();

          navigate("/signin");
        } else {
          console.error("Sign out failed");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token is invalid or expired.");

        // clear user session (token, cookies, etc.)
        clearUserSession();

        navigate("/signin");
      } else {
        console.error("Error during sign out:", error);
      }
    }
  };

  return { autoSignOut };
};
