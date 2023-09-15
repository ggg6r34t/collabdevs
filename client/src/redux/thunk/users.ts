import { BASE_URL } from "../../api/api";
import { usersActions } from "../slices/users";
import { AppDispatch } from "../store";
import { userActions } from "../slices/user";
import { User } from "../../type/types";

export function getUserList() {
  const userListURL = `${BASE_URL}/api/v1/users/`;
  const token = localStorage.getItem("userToken");
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(userListURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const fetchedUserList: User[] = await response.json();
      dispatch(usersActions.setUserList(fetchedUserList));
    } catch (error) {
      // Handle errors appropriately, e.g., dispatch an error action.
      console.error("Error fetching user list:", error);
    }
  };
}

export function getUserDetails(singleUserURL: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(singleUserURL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const fetchedUserDetails: User = await response.json();
      dispatch(userActions.setUserData(fetchedUserDetails));
    } catch (error) {
      // Handle errors appropriately, e.g., dispatch an error action.
      console.error("Error fetching user details:", error);
    }
  };
}
