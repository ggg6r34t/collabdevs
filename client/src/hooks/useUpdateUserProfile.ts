import axios from "axios";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../api/api";
import { userActions } from "../redux/slices/user";
import { User } from "../type/types";

// custom react hook to update the user's profile
export const useUpdateUserProfile = () => {
  const dispatch = useDispatch();

  const updateUserProfile = async (userId: string, newUserData: User) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        `${BASE_URL}/api/v1/users/${userId}/update`,
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUserData = response.data;
        dispatch(userActions.setUserData(updatedUserData));
      } else {
        console.error("Update profile failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { updateUserProfile };
};
