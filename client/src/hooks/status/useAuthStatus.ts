import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { AuthToken } from "../../type/types";

export function useAuthStatus(): AuthToken {
  const userToken = useSelector((state: RootState) => state.user.token);
  return userToken || null;
}
