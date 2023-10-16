import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slices/user";
import { User } from "../../type/types";

export function useSetUserSession() {
  const dispatch = useDispatch();

  // function to set user data in localStorage and Redux
  const setUserSession = (userData: User) => {
    localStorage.setItem("userToken", userData.token); // save it (token) to the localStorage
    dispatch(userActions.setUserId(userData._id)); // dispatch action to store userId in redux
    dispatch(userActions.setUserData(userData)); // store userinformation to the redux
    dispatch(userActions.setToken(userData.token)); // dispatch action to store token in redux
    dispatch(userActions.userSignIn(true)); // set user login state
  };

  return setUserSession;
}
