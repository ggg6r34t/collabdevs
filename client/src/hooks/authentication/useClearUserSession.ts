import { useDispatch } from "react-redux";

import { userActions } from "../../redux/slices/user";

export const useClearUserSession = () => {
  const dispatch = useDispatch();

  const clearUserSession = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    dispatch(userActions.removeUserData());
    dispatch(userActions.userSignOut());
  };

  return { clearUserSession };
};
