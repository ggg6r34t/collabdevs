import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { BASE_URL } from "../../api/api";
import { RootState } from "../../redux/store";
import { useClearUserSession } from "./useClearUserSession";

export const useSignOut = () => {
  const userToken = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();

  // useClearUserSession hook to get the clearUserSession function
  const { clearUserSession } = useClearUserSession();

  const signOut = async () => {
    try {
      if (userToken) {
        const response = await axios.post(
          `${BASE_URL}/api/v1/auth/signout`,

          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 200) {
          // clearUserSession to clear the user session
          clearUserSession();

          navigate("/signin");
        } else {
          console.error("Sign out failed");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token is invalid or expired.");

        // clearUserSession to clear the user session
        clearUserSession();

        navigate("/signin");
      } else {
        console.error("Error during sign out:", error);
      }
    }
  };

  return { signOut };
};
