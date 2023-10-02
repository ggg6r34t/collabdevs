import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
import { userActions } from "../redux/slices/user";

export const useAutoSignIn = () => {
  const dispatch = useDispatch();

  const autoSignIn = async () => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/users/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data;
          dispatch(userActions.setUserData(userData));
        } else {
          localStorage.removeItem("userToken");
          dispatch(userActions.removeUserData());
          dispatch(userActions.userSignOut());
        }
      } catch (error) {
        console.error("Error during autoSignIn:", error);
        localStorage.removeItem("userToken");
        dispatch(userActions.removeUserData());
        dispatch(userActions.userSignOut());
      }
    }
  };

  return { autoSignIn };
};
