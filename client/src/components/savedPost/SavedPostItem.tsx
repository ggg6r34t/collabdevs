import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { SavedPost } from "../../type/types";

type Props = {
  savedPost: SavedPost;
  onRemove: () => void;
};

function SavedPostItem({ savedPost, onRemove }: Props) {
  const { postId } = savedPost;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-gray-600 hover:text-gray-800 dark:hover:text-gray-600"
                onClick={toggleExpand}
              >
                <FontAwesomeIcon
                  icon={isExpanded ? faAngleUp : faAngleDown}
                  className="w-4 h-4"
                />
              </button>
              <p className="text-gray-600 text-sm mx-2">
                <FontAwesomeIcon icon={faThumbsUp} /> {postId.voteScore}
              </p>

              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={onRemove}
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-600 text-xs ml-auto">
              Saved {formatDistanceToNow(new Date(savedPost.savedAt))} ago
            </p>
          </div>
          <h3 className="text-lg font-semibold mt-2 mb-1">{postId.title}</h3>
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
