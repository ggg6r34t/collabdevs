import axios from "axios";
import { BASE_URL } from "../../api/api";

const useUpdatePrivacySettings = () => {
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
    updatePrivacySettings,
  };
};

export default useUpdatePrivacySettings;
