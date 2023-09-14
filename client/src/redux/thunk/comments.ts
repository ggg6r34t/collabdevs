import axios from "axios";
import { BASE_URL } from "../../api/api";
import { commentActions } from "../slices/comment";
import { AppDispatch } from "../store";

export function fetchCommentData(postId: string) {
  const commentUrl = `${BASE_URL}/api/v1/posts/${postId}/comments`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(commentUrl);
      const commentData = response.data;
      dispatch(commentActions.getComment(commentData));
    } catch (error) {
      console.error("Error fetching comment data:", error);
      dispatch(commentActions.fetchCommentError(error as Error));
    }
  };
}
