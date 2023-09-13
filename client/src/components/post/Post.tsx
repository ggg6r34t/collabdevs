import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faBookmark,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import CommentForm from "../forms/CommentForm";
import ShareButtons from "../share/ShareButtons";
import { postActions } from "../../redux/slices/post";
import { RootState } from "../../redux/store";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function PostItem({ post }: Props) {
  const showShareModal = useSelector(
    (state: RootState) => state.posts.showShareModal[post._id] || false
  );
  const [isSaved, setIsSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const dispatch = useDispatch();

  const handleSaveClick = () => {
    const newPost = {
      isSaved: isSaved,
    };

    dispatch(postActions.createPost(newPost));

    setIsSaved(!isSaved);
  };

  const toggleCommentSection = () => {
    setShowComments(!showComments);
  };

  const handleShareClick = () => {
    dispatch(postActions.setShowShareModal({ [post._id]: true }));
  };

  return (
    <div className="w-640 h-full shadow mt-4">
      <div className="border border-gray-400 rounded shadow">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center p-2">
            <button className="text-gray-600">
              <FontAwesomeIcon
                icon={faAngleUp}
                className="w-[2rem] h-[1.3rem]"
              />
            </button>
            <p className="text-[20px] text-center">0</p>
            <button className="text-gray-600">
              <FontAwesomeIcon
                icon={faAngleDown}
                className="w-[2rem] h-[1.3rem]"
              />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="p-2">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">
                Posted by {post.userName} •{" "}
                {formatDistanceToNow(new Date(post.createdAt))} hour ago
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
                  isSaved ? "black" : "gray"
                }-600 ml-auto mr-4`}
                onClick={handleSaveClick}
              >
                <FontAwesomeIcon icon={faBookmark} className="w-40 h-40" />
              </button>
            </div>
          </div>
        </div>
        {showShareModal && <ShareButtons post={post} />}
        {showComments && <CommentForm />}
      </div>
    </div>
  );
}

export default PostItem;
