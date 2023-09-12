import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { Post } from "../../type/types";

type Props = {
  post: Post;
  onRemove: () => void;
};

function SavedPostItem({ post, onRemove }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={toggleExpand}
              >
                <FontAwesomeIcon
                  icon={isExpanded ? faAngleUp : faAngleDown}
                  className="w-4 h-4"
                />
              </button>
              <p className="text-gray-600 text-sm mx-2">
                <FontAwesomeIcon icon={faThumbsUp} /> 234
              </p>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={onRemove}
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-2 mb-1">{post.postTitle}</h3>
          <p className="text-gray-600 text-xs">
            Posted by {post.author} • {post.timestamp} hour ago
          </p>
          {isExpanded && (
            <div className="text-gray-800 mt-2">{post.content}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedPostItem;
