import axios from "axios";

import { useUserSession } from "../authentication/useUserSession";
import { BASE_URL } from "../../api/api";

const useChangePassword = () => {
  const { getUserSession } = useUserSession();

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const { token } = getUserSession();
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/change-password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // password change successful
      } else {
        console.error("Change password failed");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return {
    changePassword,
  };
};

export default useChangePassword;
