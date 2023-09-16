import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faBookmark,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import CommentSection from "../comment/CommentSection";
import ShareButtons from "../share/ShareButtons";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostDetails } from "../../redux/thunk/posts";
import { postDetailActions } from "../../redux/slices/postDetail";
import { BASE_URL } from "../../api/api";

function PostDetail() {
  const postDetail = useSelector(
    (state: RootState) => state.postDetails.postDetail
  );
  const isLoading = useSelector(
    (state: RootState) => state.postDetails.isLoading
  );
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const showShareModal = useSelector(
    (state: RootState) =>
      state.posts.showShareModal[postDetail?._id || ""] || false
  );

  const [votes, setVotes] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const fetchDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const param = useParams();
  const postId = param.postId as string | undefined;

  const token = userInformation?.token;

  useEffect(() => {
    if (postId) {
      fetchDispatch(fetchPostDetails(postId, token));
    }
  }, [fetchDispatch, postId, param, token]);

  // function to upvote the post
  const handleUpvote = async (postId: string) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/posts/${postId}/upvote`
      );
      const newVoteScore = response.data.voteScore;

      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());

      setVotes(newVoteScore);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  // function to downvote the post
  const handleDownvote = async (postId: string) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/posts/${postId}/downvote`
      );
      const newVoteScore = response.data.voteScore;

      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());

      setVotes(newVoteScore);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  console.log(isSaved);

  // function to save a post
  const handleSavePost = async (userId: string | undefined, postId: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/savedposts/save`, {
        userId,
        postId,
      });

      console.log(postId, "postId");
      console.log(userId, "userId");

      if (response.status === 201) {
        setIsSaved(false);
      } else {
        console.error("Failed to save post. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // function to remove a saved post
  const handleRemoveSavedPost = async (
    userId: string | undefined,
    postId: string
  ) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/savedposts/${userId}/${postId}`
      );

      if (response.status === 204) {
        setIsSaved(!isSaved);
      } else {
        console.error(
          "Failed to remove saved post. Status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error removing saved post:", error);
    }
  };

  const toggleCommentSection = () => {
    setShowComments(!showComments);
  };

  const handleShareClick = () => {
    if (postDetail) {
      const postId = postDetail?._id;
      dispatch(postDetailActions.setShowShareModal({ [postId]: true }));
    }
  };

  if (!postDetail) {
    return (
      <div className="text-center">
        <h1 className="text-4xl">No data</h1>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="mt-15 min-h-950">
        <div className="relative top-20 left-40 inline-flex">
          <div className="w-300 h-300">
            <div className="animate-spin rounded-full h-60 w-60 border-t-8 border-blue-500 border-t-blue-200 border-r-blue-500 border-r-0 border-b-blue-500 border-b-0"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-4 py-14 flex justify-center">
      <div className="w-640 shadow mt-4">
        <div className="border border-gray-400 rounded shadow">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center p-2">
              <button className="text-gray-600">
                <FontAwesomeIcon
                  icon={faAngleUp}
                  className="w-[2rem] h-[1.3rem]"
                  onClick={() => handleUpvote(postDetail._id)}
                />
              </button>
              <p className="text-[20px] text-center">{votes}</p>
              <button className="text-gray-600">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className="w-[2rem] h-[1.3rem]"
                  onClick={() => handleDownvote(postDetail._id)}
                />
              </button>
            </div>
            <div className="flex flex-col">
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-2">
                  {postDetail.title}
                </h3>
                <p className="text-gray-600">
                  Posted by {postDetail.userName} •{" "}
                  {formatDistanceToNow(new Date(postDetail.createdAt))} ago
                </p>
              </div>
              <div className="p-2">
                <p key={postDetail._id}>{postDetail.content}</p>
              </div>
              <div className="flex justify-between p-2 pt-4 pb-4">
                <button
                  className="text-gray-600"
                  onClick={toggleCommentSection}
                >
                  <FontAwesomeIcon
                    icon={faComment}
                    className="w-40 h-40 mr-2"
                  />
                  Comment
                </button>

                <button
                  className="text-gray-600 ml-4"
                  onClick={handleShareClick}
                >
                  <FontAwesomeIcon
                    icon={faShareFromSquare}
                    className="w-40 h-40 mr-2"
                  />
                  Share
                </button>
                <button
                  className={`text-${
                    !isSaved ? "[#010536]" : "gray"
                  }-600 ml-auto mr-4`}
                  onClick={() =>
                    isSaved
                      ? handleSavePost(userInformation?._id, postDetail._id)
                      : handleRemoveSavedPost(
                          userInformation?._id,
                          postDetail._id
                        )
                  }
                >
                  <FontAwesomeIcon icon={faBookmark} className="w-40 h-40" />
                </button>
              </div>
            </div>
          </div>
          {showShareModal && <ShareButtons post={postDetail} />}
          {showComments && <CommentSection post={postDetail} />}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
