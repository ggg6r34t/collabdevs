import axios from "axios";
import { BASE_URL } from "../../api/api";

const useUpdateEmailNotifications = () => {
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

  return {
    updateEmailNotifications,
  };
};

export default useUpdateEmailNotifications;
