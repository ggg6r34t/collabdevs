import { useEffect, useState } from "react";
import { useParams } from "react-router";
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

import { useUserSession } from "../../hooks/authentication/useUserSession";
import { useSavePost } from "../../hooks/userManagement/useSavePost";
import useFormattedNumber from "../../hooks/util/useFormattedNumber";
import { postDetailActions } from "../../redux/slices/postDetail";
import { useVote } from "../../hooks/userManagement/useVote";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostDetails } from "../../redux/thunk/posts";
import { postActions } from "../../redux/slices/post";
import CommentSection from "../comment/Comments";
import ShareButtons from "../share/ShareButtons";

function PostDetails() {
  const postDetail = useSelector(
    (state: RootState) => state.postDetails.postDetail
  );
  const voteScore = useSelector((state: RootState) => {
    return (
      state.posts.posts.find((p) => p._id === postDetail?._id)?.voteScore || 0
    );
  });
  const isLoading = useSelector(
    (state: RootState) => state.postDetails.isLoading
  );
  const userToken = useSelector((state: RootState) => state.user.token);
  const currentOpenPostId = useSelector(
    (state: RootState) => state.postDetails.currentOpenPostId
  );

  const [showComments, setShowComments] = useState(true);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const fetchDispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch();

  const formattedVoteScore = useFormattedNumber(voteScore);

  const { getUserSession } = useUserSession();
  const { userId } = getUserSession();

  const param = useParams();
  const postId = param.postId as string | undefined;

  useEffect(() => {
    localStorage.getItem(`voteScore_${postDetail?._id}`);
    if (postId) {
      fetchDispatch(fetchPostDetails(postId, userToken!));
    }
  }, [fetchDispatch, postId, param, userToken, postDetail?._id]);

  const postDetailId = postDetail?._id;

  const { handleUpvote, handleDownvote } = useVote(
    postDetailId!,
    userId!,
    userToken!
  );

  const { isSaved, setIsSaved, handleSavePost, handleRemoveSavedPost } =
    useSavePost(userId!, postDetailId!);

  const toggleCommentSection = () => {
    setShowComments(!showComments);
  };

  // checks if the modal should be shown for the current post
  const show = currentOpenPostId === postDetail?._id;

  const handleShareClick = () => {
    dispatch(
      postDetailActions.setShowShareModal({
        postId: postDetail?._id as string,
        show: !show,
      })
    );
  };

  const handleUpvoteClick = () => {
    if (upvoted) {
      // handle the removal of upvote and update local storage.
      handleDownvote();
      dispatch(postActions.downvotePost(postDetailId!));
      localStorage.setItem(`upvoted_${userId}_${postDetailId!}`, "false");
      setUpvoted(false);
    } else {
      // handle upvote and update local storage.
      handleUpvote();
      dispatch(postActions.upvotePost(postDetailId!));
      localStorage.setItem(`upvoted_${userId}_${postDetailId!}`, "true");
      setUpvoted(true);
      setDownvoted(false);
      localStorage.removeItem(`downvoted_${userId}_${postDetailId!}`); // remove the downvoted state.
    }
  };

  const handleDownvoteClick = () => {
    if (downvoted) {
      // handle the removal of downvote and update local storage.
      handleUpvote();
      dispatch(postActions.upvotePost(postDetailId!));
      localStorage.setItem(`downvoted_${userId}_${postDetailId!}`, "false");
      setDownvoted(false);
    } else {
      // handle downvote and update local storage.
      handleDownvote();
      dispatch(postActions.downvotePost(postDetailId!));
      localStorage.setItem(`downvoted_${userId}_${postDetailId!}`, "true");
      setDownvoted(true);
      setUpvoted(false);
      localStorage.removeItem(`upvoted_${userId}_${postDetailId!}`); // remove the upvoted state.
    }
  };

  useEffect(() => {
    // check the local storage for saved, upvoted, and downvoted states
    const upvotedState = localStorage.getItem(
      `upvoted_${userId}_${postDetailId!}`
    );
    const downvotedState = localStorage.getItem(
      `downvoted_${userId}_${postDetailId!}`
    );
    const savedState = localStorage.getItem(`saved_${userId}_${postDetailId!}`);

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
  }, [postDetailId, setIsSaved, userId]);

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
    <div className="min-h-screen dark:bg-slate-900 p-4 py-14 flex justify-center">
      <div className="w-[700px] h-full bg-gray-100 dark:bg-slate-800 shadow rounded-lg mt-4">
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
              <h3 className="text-lg font-semibold mb-2">{postDetail.title}</h3>
              <p className="text-gray-600">
                Posted by {postDetail.userName} •{" "}
                {formatDistanceToNow(new Date(postDetail.createdAt))} ago
              </p>
            </div>
            <div className="p-2">
              <p key={postDetail._id}>{postDetail.content}</p>
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
        {show && (
          <div className="relative -right-12">
            {<ShareButtons post={postDetail} />}
          </div>
        )}
        {showComments && <CommentSection post={postDetail} />}
      </div>
    </div>
  );
}

export default PostDetails;
