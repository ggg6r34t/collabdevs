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

export function fetchRecommendedUsers() {
  const usersUrl = `${BASE_URL}/api/v1/users/recommended-users/`;
  const token = localStorage.getItem("userToken");

  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(usersUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const recommendedUserData = response.data;
      dispatch(usersActions.setRecommendedUsers(recommendedUserData));
    } catch (error) {
      console.error("Error fetching recommended user data:", error);
      dispatch(usersActions.fetchUserError(error as Error));
    }
  };
}

// function to get a user's details
export function getUserDetails(userId: string) {
  const userURL = `${BASE_URL}/api/v1/users/${userId}`;
  const token = localStorage.getItem("userToken");

  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(userURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedUserDetails: User = response.data;
      dispatch(userActions.setUserProfile(fetchedUserDetails));
    } catch (error) {
      // handle errors appropriately, e.g., dispatch an error action.
      console.error("Error fetching user details:", error);
    }
  };
}

// function to get user posts
export function getPostByUserId(userId: string) {
  const userPostById = `${BASE_URL}/api/v1/users/${userId}/posts`;
  const token = localStorage.getItem("userToken");

  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(userPostById, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const postData = response.data;
      // dispatch an action to update the Redux state with the fetched posts
      dispatch(postActions.setPostsByUserId(postData));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };
}
