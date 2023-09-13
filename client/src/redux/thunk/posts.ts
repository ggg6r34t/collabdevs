import axios from "axios";
import { BASE_URL } from "../../api/api";
import { postActions } from "../slices/post";
import { AppDispatch } from "../store";
import { Post } from "../../type/types";

export function fetchPostData() {
  const postUrl = `${BASE_URL}/api/v1/posts/`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(postUrl);
      const postData = response.data;
      dispatch(postActions.getPost(postData));
    } catch (error) {
      console.error("Error fetching post data:", error);
      dispatch(postActions.fetchPostError(error as Error));
    }
  };
}

export function createPost(postData: Partial<Post>) {
  const postUrl = `${BASE_URL}/api/v1/posts/`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(postUrl, postData);
      const newPostData = response.data;
      dispatch(postActions.createPost(newPostData));
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch(postActions.createPostError(error as Error));
    }
  };
}