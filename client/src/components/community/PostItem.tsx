import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as solidFaBookmark,
  faUpLong,
  faDownLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faBookmark as regularFaBookmark,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import CommentSection from "../comment/Comments";
import ShareButtons from "../share/ShareButtons";
import { useUserSession } from "../../hooks/authentication/useUserSession";
import { useSavePost } from "../../hooks/userManagement/useSavePost";
import useFormattedNumber from "../../hooks/util/useFormattedNumber";
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
  const userToken = useSelector((state: RootState) => state.user.token);
  const currentOpenPostId = useSelector(
    (state: RootState) => state.posts.currentOpenPostId
  );
  const [showComments, setShowComments] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formattedVoteScore = useFormattedNumber(voteScore);

  const { getUserSession } = useUserSession();
  const { userId } = getUserSession();

  // initialize the votes state with the value from localStorage if it exists
  useEffect(() => {
    localStorage.getItem(`voteScore_${post._id}`);
    dispatch(postActions.setInitialVoteScores(post.voteScore));
  }, [dispatch, post._id, post.voteScore]);

  const { handleUpvote, handleDownvote } = useVote(
    post._id,
    userId!,
    userToken!
  );

  const { isSaved, setIsSaved, handleSavePost, handleRemoveSavedPost } =
    useSavePost(userId!, post._id);

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
      // handle the removal of upvote and update local storage.
      handleDownvote();
      dispatch(postActions.downvotePost(post._id));
      localStorage.setItem(`upvoted_${userId}_${post._id}`, "false");
      setUpvoted(false);
    } else {
      // handle upvote and update local storage.
      handleUpvote();
      dispatch(postActions.upvotePost(post._id));
      localStorage.setItem(`upvoted_${userId}_${post._id}`, "true");
      setUpvoted(true);
      setDownvoted(false);
      localStorage.removeItem(`downvoted_${userId}_${post._id}`); // remove the downvoted state.
    }
  };

  const handleDownvoteClick = () => {
    if (downvoted) {
      // handle the removal of downvote and update local storage.
      handleUpvote();
      dispatch(postActions.upvotePost(post._id));
      localStorage.setItem(`downvoted_${userId}_${post._id}`, "false");
      setDownvoted(false);
    } else {
      // handle downvote and update local storage.
      handleDownvote();
      dispatch(postActions.downvotePost(post._id));
      localStorage.setItem(`downvoted_${userId}_${post._id}`, "true");
      setDownvoted(true);
      setUpvoted(false);
      localStorage.removeItem(`upvoted_${userId}_${post._id}`); // remove the upvoted state.
    }
  };

  useEffect(() => {
    // check the local storage for saved, upvoted, and downvoted states
    const upvotedState = localStorage.getItem(`upvoted_${userId}_${post._id}`);
    const downvotedState = localStorage.getItem(
      `downvoted_${userId}_${post._id}`
    );
    const savedState = localStorage.getItem(`saved_${userId}_${post._id}`);

    if (upvotedState === "true") {
      setUpvoted(true);
    } else {
      setUpvoted(false);
    }

    if (downvotedState === "true") {
      setDownvoted(true);
    } else {
      setDownvoted(false);
    }

    if (savedState === "true") {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [post._id, setIsSaved, userId]);

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center p-2">
          <button onClick={handleUpvoteClick}>
            <FontAwesomeIcon
              icon={faUpLong}
              size="2x"
              color={upvoted ? "#00AA00" : "#9ca3af"}
              className="h-6"
            />
          </button>
          <p className="text-[20px] text-center">{formattedVoteScore}</p>
          <button onClick={handleDownvoteClick}>
            <FontAwesomeIcon
              icon={faDownLong}
              size="2x"
              color={downvoted ? "#FF0000" : "#9ca3af"}
              className="h-6"
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
              className="ml-auto mr-4"
              onClick={() =>
                isSaved ? handleRemoveSavedPost() : handleSavePost()
              }
            >
              {isSaved ? (
                <FontAwesomeIcon
                  icon={solidFaBookmark}
                  color="#800080"
                  className="w-40 h-40"
                />
              ) : (
                <FontAwesomeIcon
                  icon={regularFaBookmark}
                  color="#4b5563"
                  className="w-40 h-40"
                />
              )}
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
