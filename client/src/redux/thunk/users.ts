import { BASE_URL } from "../../api/api";
import { usersActions } from "../slices/users";
import { AppDispatch } from "../store";
import { userActions } from "../slices/user";
import { User } from "../../type/types";
import axios from "axios";
import { postActions } from "../slices/post";

// function to get the list user accounts
export function getUserList() {
  const userListURL = `${BASE_URL}/api/v1/users/`;
  const token = localStorage.getItem("userToken");

  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(userListURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedUserList: User[] = response.data;
      dispatch(usersActions.setUserList(fetchedUserList));
    } catch (error) {
      // Handle errors appropriately, e.g., dispatch an error action.
      console.error("Error fetching user list:", error);
    }
  };
}

// function to get a user's details
export function getUserDetails(singleUserURL: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(singleUserURL);

      const fetchedUserDetails: User = response.data;
      dispatch(userActions.setUserData(fetchedUserDetails));
    } catch (error) {
      // Handle errors appropriately, e.g., dispatch an error action.
      console.error("Error fetching user details:", error);
    }
  };
}

// function to get user posts
export function getPostByUserId(userId: string) {
  const userPostById = `${BASE_URL}/api/v1/users/${userId}/posts`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(userPostById);
      const postData = response.data;

      // dispatch an action to update the Redux state with the fetched posts
      dispatch(postActions.setPostsByUserId({ userId, posts: postData }));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };
}
