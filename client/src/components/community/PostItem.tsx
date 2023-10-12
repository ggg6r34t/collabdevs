import { Link, useNavigate } from "react-router-dom";
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

import CommentSection from "../comment/Comments";
import ShareButtons from "../share/ShareButtons";
import { useSavePost } from "../../hooks/userManagement/useSavePost";
import { useVote } from "../../hooks/userManagement/useVote";
import { postActions } from "../../redux/slices/post";
import { RootState } from "../../redux/store";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function PostItem({ post }: Props) {
  const voteScore = useSelector((state: RootState) => {
    return state.posts.posts.find((p) => p._id === post._id)?.voteScore || 0;
  });
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const userToken = useSelector((state: RootState) => state.user.token);
  const currentOpenPostId = useSelector(
    (state: RootState) => state.posts.currentOpenPostId
  );
  const [showComments, setShowComments] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initialize the votes state with the value from localStorage if it exists
  useEffect(() => {
    localStorage.getItem(`voteScore_${post._id}`);
    dispatch(postActions.setInitialVoteScores(post.voteScore));
  }, [dispatch, post._id, post.voteScore]);

  const { handleUpvote, handleDownvote } = useVote(
    post._id,
    userInformation?._id,
    userToken!
  );

  const { isSaved, handleSavePost, handleRemoveSavedPost } = useSavePost(
    userInformation?._id,
    post._id
  );

  const toggleCommentSection = () => {
    setShowComments(!showComments);
    navigate(`/posts/${post._id}`);
  };

  // checks if the modal should be shown for the current post
  const show = currentOpenPostId === post._id;

  // toggle the showShareModal state for the current post
  // if 'show' is currently true, clicking will hide the modal and vice versa (!show).
  const handleShareClick = () => {
    dispatch(postActions.setShowShareModal({ postId: post._id, show: !show }));
  };

  const handleUpvoteClick = () => {
    if (upvoted) {
      setDownvoted(false);
    }

    handleUpvote();
    dispatch(postActions.upvotePost(post._id));
    setUpvoted(true);
    setDownvoted(false);
  };

  const handleDownvoteClick = () => {
    if (downvoted) {
      setDownvoted(false);
    }

    handleDownvote();
    dispatch(postActions.downvotePost(post._id));
    setDownvoted(true);
    setUpvoted(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center p-2">
          <button
            className={`text-gray-600 border-2 rounded-full border-gray-400 ${
              upvoted ? "border-blue-500" : ""
            }`}
            onClick={handleUpvoteClick}
          >
            <FontAwesomeIcon icon={faAngleUp} className="w-[2rem] h-[1.3rem]" />
          </button>
          <p className="text-[20px] text-center">{voteScore}</p>
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
              className={`${
                !isSaved
                  ? "text-gray-600"
                  : "text-[#010536]  dark:text-gray-200"
              } ml-auto mr-4`}
              onClick={() =>
                isSaved ? handleRemoveSavedPost() : handleSavePost()
              }
            >
              <FontAwesomeIcon icon={faBookmark} className="w-40 h-40" />
            </button>
          </div>
        </div>
      </div>
      {show && <ShareButtons post={post} />}
      {showComments && <CommentSection post={post} />}
    </div>
  );
}

export default PostItem;
