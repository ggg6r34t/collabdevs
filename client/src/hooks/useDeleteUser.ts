import axios from "axios";
import { useState } from "react";

import { BASE_URL } from "../api/api";

const useDeleteUser = () => {
  const [token] = useState(localStorage.getItem("token")); // You might want to store your token in state or context

  const deleteUser = (userId: string) => {
    const url = `${BASE_URL}/api/v1/users/${userId}`;

    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
