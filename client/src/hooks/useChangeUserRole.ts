import axios from "axios";
import { useState } from "react";

import { BASE_URL } from "../api/api";

const useChangeUserRole = () => {
  const [token] = useState(localStorage.getItem("token")); // You might want to store your token in state or context

  const changeUserRole = (_id: string, role: string, email: string) => {
    const url = `${BASE_URL}/api/v1/users/${_id}/update-role`;

    axios
      .put(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
