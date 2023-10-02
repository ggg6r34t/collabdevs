import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../redux/slices/user";
import { BASE_URL } from "../api/api";
import { RootState } from "../redux/store";

export const useSignOut = () => {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      const token = userInformation?.token;

      if (token) {
        const response = await axios.post(
          `${BASE_URL}/api/v1/users/signout`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("userToken");
          dispatch(userActions.removeUserData());
          dispatch(userActions.userSignOut());
          navigate("/signin");
        } else {
          console.error("Sign out failed");
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token is invalid or expired.");
        localStorage.removeItem("userToken");
        dispatch(userActions.removeUserData());
        dispatch(userActions.userSignOut());
        navigate("/signin");
      } else {
        console.error("Error during sign out:", error);
      }
    }
  };

  return { signOut };
};
