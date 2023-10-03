import axios from "axios";

import { BASE_URL } from "../api/api";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const useDeleteUser = () => {
  const userToken = useSelector((state: RootState) => state.user.token);

  const deleteUser = (userId: string) => {
    const url = `${BASE_URL}/api/v1/users/${userId}`;

    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 403) {
          alert("Successfully Deleted");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          return;
        }
      });
  };

  return {
    deleteUser,
  };
};

export default useDeleteUser;
