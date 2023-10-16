import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useUserSession = () => {
  const userToken = useSelector((state: RootState) => state.user.token);
  const id = useSelector((state: RootState) => state.user.userId);

  const getUserSession = () => {
    const token = userToken;
    const userId = id;
    const profileOwnerId = id;
    return { token, userId, profileOwnerId };
  };

  return { getUserSession };
};
