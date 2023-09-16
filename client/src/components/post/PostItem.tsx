import axios from "axios";
import { useEffect, useState } from "react";
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
import { postActions } from "../../redux/slices/post";
import { RootState } from "../../redux/store";
import { Post } from "../../type/types";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  post: Post;
};

function PostItem({ post }: Props) {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const showShareModal = useSelector(
    (state: RootState) => state.posts.showShareModal[post._id] || false
  );
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialize the votes state with the value from localStorage if it exists
  useEffect(() => {
    localStorage.getItem(`voteScore_${post._id}`);
  }, [post._id]);

  // function to update the voteScore in both state and localStorage
  const updateVoteScore = (postId: string, newVoteScore: number) => {
    localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
  };

  // function to upvote the post
  const handleUpvote = async (
    postId: string,
    userId: string | undefined,
    token: string | undefined
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/posts/${postId}/upvote`,
        userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newVoteScore = response.data.voteScore;
      updateVoteScore(postId, newVoteScore);
      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  // function to downvote the post
  const handleDownvote = async (
    postId: string,
    userId: string | undefined,
    token: string | undefined
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/posts/${postId}/downvote`,
        userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newVoteScore = response.data.voteScore;
      updateVoteScore(postId, newVoteScore);
      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  // function to save a post
  const handleSavePost = async (userId: string | undefined, postId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/savedposts/save",
        {
          userId,
          postId,
        }
      );

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
        `http://localhost:8000/api/v1/savedposts/${userId}/${postId}`
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
    navigate(`/posts/${post._id}`);
  };

  console.log(userInformation?.token, "postItem");

  const handleShareClick = () => {
    dispatch(postActions.setShowShareModal({ [post._id]: true }));
  };

  const handleUpvoteClick = () => {
    if (upvoted) {
      setDownvoted(false);
    }

    handleUpvote(post._id, userInformation?._id, userInformation?.token);
    setUpvoted(true);
    setDownvoted(false);
  };

  const handleDownvoteClick = () => {
    if (downvoted) {
      setDownvoted(false);
    }

    handleDownvote(post._id, userInformation?._id, userInformation?.token);
    setDownvoted(true);
    setUpvoted(false);
  };

  return (
    <div className="w-640 h-full shadow mt-4">
      <div className="border border-gray-400 rounded shadow">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center p-2">
            <button
              className={`text-gray-600 border-2 rounded-full border-gray-400 ${
                upvoted ? "border-blue-500" : ""
              }`}
              onClick={handleUpvoteClick}
            >
              <FontAwesomeIcon
                icon={faAngleUp}
                className="w-[2rem] h-[1.3rem]"
              />
            </button>
            <p className="text-[20px] text-center">{post.voteScore}</p>
            <button
              className={`text-gray-600 border-2 rounded-full border-gray-400 ${
                downvoted ? "border-red-500" : ""
              }`}
              onClick={handleDownvoteClick}
            >
              <FontAwesomeIcon
                icon={faAngleDown}
                className="w-[2rem] h-[1.3rem]"
              />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="p-2">
              <Link to={`/posts/${post._id}`}>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              </Link>
              <p className="text-gray-600">
                Posted by {post.userName} •{" "}
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </p>
            </div>
            <div className="p-2">
              <p className="truncate-line line-clamp-3" key={post._id}>
                {post.content}
              </p>
            </div>
            <div className="flex justify-between p-2 pt-4 pb-4">
              <button className="text-gray-600" onClick={toggleCommentSection}>
                <FontAwesomeIcon icon={faComment} className="w-40 h-40 mr-2" />
                Comment
              </button>

              <button className="text-gray-600 ml-4" onClick={handleShareClick}>
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
                    ? handleSavePost(userInformation?._id, post._id)
                    : handleRemoveSavedPost(userInformation?._id, post._id)
                }
              >
                <FontAwesomeIcon icon={faBookmark} className="w-40 h-40" />
              </button>
            </div>
          </div>
        </div>
        {showShareModal && <ShareButtons post={post} />}
        {showComments && <CommentSection post={post} />}
      </div>
    </div>
  );
}

export default PostItem;
