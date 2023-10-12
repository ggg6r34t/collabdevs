import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Post, User } from "../../type/types";

type PostState = {
  posts: Post[];
  voteScores: number;
  postsByUserId: Post[];
  users: User[];
  error: Error | null;
  isLoading: boolean;
  showShareModal: { [postId: string]: boolean };
  currentOpenPostId: string | null;
  selectedSort: string;
  isSearchActive: boolean;
  searchType: string;
  searchResults: Post[]; // array type notation of Post or User types
};

const initialState: PostState = {
  posts: [],
  voteScores: 0,
  postsByUserId: [],
  users: [],
  error: null,
  isLoading: true,
  showShareModal: {},
  currentOpenPostId: null,
  selectedSort: "latest",
  isSearchActive: false, // initialize the flag as false
  searchType: "",
  searchResults: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPost: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    setPostsByUserId: (state, action: PayloadAction<Post[]>) => {
      const posts = action.payload;
      state.postsByUserId = posts;
    },
    createPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setInitialVoteScores(state, action) {
      state.voteScores = action.payload;
    },
    upvotePost(state, action) {
      const postId = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        if (post.upvoted) {
          post.upvoted = false; // removing upvote
          post.voteScore -= 1;
        } else if (post.downvoted) {
          post.downvoted = false; // remove downvote if it exists
          post.voteScore -= 1;
        } else {
          post.upvoted = true; // upvoting the post
          post.voteScore += 1;
        }
      }
    },
    downvotePost(state, action) {
      const postId = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        if (post.downvoted) {
          post.downvoted = false; // removing downvote
          post.voteScore -= 1;
        } else if (post.upvoted) {
          post.voteScore -= 1;
          post.upvoted = false; // remove upvote if it exists
        } else {
          post.downvoted = true; // downvoting the post
          post.voteScore += 1;
        }
      }
    },
    setShowShareModal: (
      state,
      action: PayloadAction<{ postId: string; show: boolean }>
    ) => {
      const { postId, show } = action.payload;

      if (show) {
        // if 'show' is true, set the currentOpenPostId to postId
        state.currentOpenPostId = postId;
      } else if (state.currentOpenPostId === postId) {
        // if false and the currentOpenPostId matches postId, reset it
        state.currentOpenPostId = null;
      }

      // update the showShareModal object for the specific postId
      state.showShareModal = { ...state.showShareModal, [postId]: show };
    },
    setSelectedSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    searchPost(state, action: PayloadAction<{ query: string; type: string }>) {
      const { query, type } = action.payload;

      if (type === "topic") {
        const postResults = state.posts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );
        state.searchResults = postResults;
        state.searchType = "post";
      } else {
        state.searchResults = [];
        state.searchType = "";
      }

      // check if the query is empty or if there are no search results
      state.isSearchActive =
        query.trim() !== "" || state.searchResults.length > 0;
    },
    setIsSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    },
    resetSearchResults: (state) => {
      // reset the search results by fetching the original posts
      state.searchResults = [];
      state.searchType = "";
      state.isSearchActive = false;
    },
    createPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    fetchPostError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
  },
});

export const postActions = postsSlice.actions;
const postsReducer = postsSlice.reducer;
export default postsReducer;
