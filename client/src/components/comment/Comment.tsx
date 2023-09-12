import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import ReplyForm from "../forms/ReplyForm";
import { Post } from "../../type/types";
import ReplySection from "../reply/ReplySection";

type Props = {
  comment: Partial<Post>;
};

function Comment({ comment }: Props) {
  const [showReply, setShowReply] = useState(false);

  const toggleReplySection = () => {
    setShowReply(!showReply);
  };

  return (
    <div className="w-[566px] ml-12 my-6">
      <li className="p-2 mb-2">
        <div className="flex flex-row p-2">
          <div className="flex-shrink-0 w-7 h-7 bg-gray-300 rounded-full mr-4"></div>
          <p className="text-gray-600">
            {comment.author} • {comment.timestamp} hour ago
          </p>
        </div>

        <p className="p-2">{comment.content}</p>
        <div className="flex justify-between pl-2 pb-4 border-b border-gray-400">
          <button className="text-gray-600" onClick={toggleReplySection}>
            <FontAwesomeIcon icon={faComment} className="w-4.5 h-4.5 mr-2" />
            Reply
          </button>

          <button className="text-gray-600 ml-4 mr-auto">
            <FontAwesomeIcon
              icon={faShareFromSquare}
              className="w-4.5 h-4.5 mr-2"
            />
            Share
          </button>
        </div>
        {showReply && <ReplySection />}
        {showReply && <ReplyForm />}
      </li>
    </div>
  );
}

export default Comment;
