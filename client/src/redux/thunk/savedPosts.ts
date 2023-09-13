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

export function savePost(userId: string, postId: string) {
  const savedPostUrl = `${BASE_URL}/api/v1/savedpost/save`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(savedPostUrl, {
        userId,
        postId,
      });
      const savedPost = response.data;
      dispatch(savedPostActions.addSavedPost(savedPost));
    } catch (error) {
      console.error("Error saving post:", error);
      dispatch(savedPostActions.fetchSavedPostsError(error as Error));
    }
  };
}
