// import { useDispatch } from "react-redux";
import axios from "axios";

// import { userActions } from "../redux/slices/user";
import { useUserSession } from "./useUserSession";
import { BASE_URL } from "../api/api";

export function useSettings() {
  //   const dispatch = useDispatch();

  const { getUserSession } = useUserSession();

  // change the user's password
  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const { token } = getUserSession();
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/change-password`,
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

  // update email notification preferences
  const updateEmailNotifications = async (preference: string) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/update-email-notifications`,
        { preference },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // email notification preference updated
      } else {
        console.error("Update email notifications failed");
      }
    } catch (error) {
      console.error("Error updating email notifications:", error);
    }
  };

  // update privacy settings
  const updatePrivacySettings = async (
    profileVisibility: boolean,
    emailVisibility: boolean
  ) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/update-privacy-settings`,
        { profileVisibility, emailVisibility },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // privacy settings updated
      } else {
        console.error("Update privacy settings failed");
      }
    } catch (error) {
      console.error("Error updating privacy settings:", error);
    }
  };

  return {
    changePassword,
    updateEmailNotifications,
    updatePrivacySettings,
  };
}
