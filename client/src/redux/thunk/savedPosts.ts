import axios from "axios";
import { BASE_URL } from "../../api/api";
import { savedPostActions } from "../slices/savedPost";
import { AppDispatch } from "../store";

export function fetchSavedPostData(userId: string | undefined) {
  const savedPostUrl = `${BASE_URL}/api/v1/savedposts/${userId}`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(savedPostUrl);
      const savedPosts = response.data;
      dispatch(savedPostActions.getSavedPosts(savedPosts));
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      dispatch(savedPostActions.fetchSavedPostsError(error as Error));
    }
  };
}
