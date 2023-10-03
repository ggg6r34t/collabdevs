import axios from "axios";
import { useSelector } from "react-redux";

import { BASE_URL } from "../api/api";
import { RootState } from "../redux/store";

const useChangeUserRole = () => {
  const userToken = useSelector((state: RootState) => state.user.token);

  const changeUserRole = (_id: string, role: string, email: string) => {
    const url = `${BASE_URL}/api/v1/users/${_id}/update-role`;

    axios
      .put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          role = role === "admin" ? "user" : "admin";
          alert(`Successfully updated the role for ${email} to ${role}`);
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
    changeUserRole,
  };
};

export default useChangeUserRole;
