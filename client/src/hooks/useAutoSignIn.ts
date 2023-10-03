import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { userActions } from "../redux/slices/user";
import { useSignOut } from "./useSignOut";
import { useClearUserSession } from "./useClearUserSession";

export const useAutoSignIn = () => {
  const dispatch = useDispatch();

  const { clearUserSession } = useClearUserSession();
  const { signOut } = useSignOut();

  const autoSignIn = async () => {
    const token = localStorage.getItem("userToken");

    if (token) {
      // decode the JWT token to check its expiration
      const isTokenExpired = () => {
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return tokenData.exp < currentTime;
      };

      if (isTokenExpired()) {
        // token is expired; clear user session and sign them out
        clearUserSession();
        signOut();
        return;
      }

      try {
        // only send the request to the server if the token is not expired
        const response = await axios.get(`${BASE_URL}/api/v1/users/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch(userActions.setUserData(userData));
        } else {
          // clear the token and sign the user out here if needed
          clearUserSession();
          signOut();
        }
      } catch (error) {
        console.error("Error during autoSignIn:", error);
        // clear the token and sign the user out here if needed
        clearUserSession();
        signOut();
      }
    }
  };

  return { autoSignIn };
};
