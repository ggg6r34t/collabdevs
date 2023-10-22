import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useSavePost } from "../../hooks/userManagement/useSavePost";
import { useUserSession } from "../../hooks/authentication/useUserSession";
import { SavedPost } from "../../type/types";

type Props = {
  savedPost: SavedPost;
};

function SavedPostItem({ savedPost }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { getUserSession } = useUserSession();
  const { userId } = getUserSession();
  const { postId } = savedPost;

  const savedPostId = savedPost.postId._id;

  const { handleRemoveSavedPost } = useSavePost(userId!, savedPostId);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <div className="bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
                onClick={toggleExpand}
              >
                <FontAwesomeIcon
                  icon={isExpanded ? faAngleUp : faAngleDown}
                  className="w-4 h-4"
                />
              </button>
              <p className="text-gray-600 dark:hover:text-gray-400 text-sm mx-2">
                <FontAwesomeIcon icon={faThumbsUp} /> {postId.voteScore}
              </p>

              <button
                className="text-gray-600 hover:text-gray-800 dark:hover:text-gray-400"
                onClick={handleRemoveSavedPost}
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 text-xs ml-auto">
              Saved {formatDistanceToNow(new Date(savedPost.savedAt))} ago
            </p>
          </div>
          <Link to={`/posts/${postId._id}`}>
            <h3 className="text-lg font-semibold mt-2 mb-1">{postId.title}</h3>
          </Link>
          <p className="text-gray-600 text-xs">
            Posted by {postId.userName} •{" "}
            {formatDistanceToNow(new Date(postId.createdAt))} hour ago
          </p>
          {isExpanded && (
            <div className="text-gray-800 dark:text-white mt-2">
              {postId.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedPostItem;
