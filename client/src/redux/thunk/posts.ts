import axios from "axios";

import { BASE_URL } from "../../api/api";
import { AppDispatch } from "../store";
import { postActions } from "../slices/post";
import { postDetailActions } from "../slices/postDetail";
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

export function fetchTrendingTopics() {
  const postUrl = `${BASE_URL}/api/v1/posts/trending-topics/`;
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(postUrl);
      const trendingTopicsData = response.data;
      dispatch(postActions.setTrendingTopics(trendingTopicsData));
    } catch (error) {
      console.error("Error fetching trending topics data:", error);
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

export function fetchPostDetails(postId: string, token: string | undefined) {
  const postIdUrl = `${BASE_URL}/api/v1/posts/${postId}`;
  return async (dispact: AppDispatch) => {
    try {
      const response = await axios.get(postIdUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postDetailData = response.data;
      dispact(postDetailActions.getPostDetails(postDetailData));
    } catch (error) {
      console.error("Error fetching post:", error);
      dispact(postDetailActions.fetchPostError(error as Error));
    }
  };
}
