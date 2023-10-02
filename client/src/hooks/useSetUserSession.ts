import { useDispatch } from "react-redux";
import { userActions } from "../redux/slices/user";
import { User } from "../type/types";

export function useSetUserSession() {
  const dispatch = useDispatch();

  // Function to set user data in localStorage and Redux
  const setUserSession = (userData: User) => {
    localStorage.setItem("userToken", userData.token); // save it (token) to the localStorage
    localStorage.setItem("userId", userData._id); // save it (userId) to the localStorage
    dispatch(userActions.setUserData(userData)); // store userinformation to the redux
    dispatch(userActions.userSignIn(true)); // set user login state
  };

  return setUserSession;
}
