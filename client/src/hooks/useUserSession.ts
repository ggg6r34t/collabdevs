import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useUserSession = () => {
  const userToken = useSelector((state: RootState) => state.user.token);

  const getUserSession = () => {
    const token = userToken;
    const userId = localStorage.getItem("userId");
    return { token, userId };
  };

  return { getUserSession };
};
