import { useNavigate } from "react-router-dom";

import axios from "../api/axiosConfig";
import { useSetUserSession } from "./useSetUserSession";
import { LoginCredentials, User } from "../type/types";

export const useSignIn = () => {
  const navigate = useNavigate();

  // useSetUserSession hook to get the setUserSession function
  const setUserSession = useSetUserSession();

  const signIn = async (logInCredentials: LoginCredentials) => {
    try {
      const endpoint = "/api/v1/auth/signin";
      const response = await axios.post(endpoint, logInCredentials);

      if (response.status === 200) {
        // store the userData and userToken securely in local storage
        const userData: User = response.data.userData; // from data object. get and assign the token

        // save userData to redux
        setUserSession(userData);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { signIn };
};
