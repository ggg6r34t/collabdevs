import axios from "axios";
// import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/api";
// import { userActions } from "../redux/slices/user";
import { User } from "../type/types";

export const useUpdateUserProfile = () => {
  //   const dispatch = useDispatch();

  const updateUserProfile = async (newUserData: User) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        `${BASE_URL}/api/v1/users/profile`,
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update successful
        // You can dispatch an action to update user data in Redux if needed
      } else {
        console.error("Update profile failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return { updateUserProfile };
};
