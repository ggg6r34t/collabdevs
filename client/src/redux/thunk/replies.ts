import axios from "axios";
import { BASE_URL } from "../../api/api";
import { replyActions } from "../slices/reply";
import { AppDispatch } from "../store";

export function fetchReplyData(commentId: string) {
  const replyUrl = `${BASE_URL}/api/v1/posts/${commentId}`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(replyUrl);
      const replyData = response.data;
      dispatch(replyActions.getReply(replyData));
    } catch (error) {
      console.error("Error fetching reply data:", error);
      dispatch(replyActions.fetchReplyError(error as Error));
    }
  };
}
