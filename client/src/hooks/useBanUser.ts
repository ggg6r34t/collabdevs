import axios from "axios";
import { useSelector } from "react-redux";

import { BASE_URL } from "../api/api";
import { RootState } from "../redux/store";

const useBanUser = () => {
  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const userToken = useSelector((state: RootState) => state.user.token);

  const banUser = (_id: string, isBanned: boolean, email: string) => {
    if (_id !== currentUser?._id) {
      const url = `${BASE_URL}/api/v1/users/${_id}/update-restriction`;

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
            const status = isBanned ? "Unbanned" : "Banned";
            alert(`Successfully updated the status for ${email} to ${status}`);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error);
            return;
          }
        });
    }
  };

  return {
    banUser,
  };
};

export default useBanUser;
