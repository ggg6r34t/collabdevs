import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import ReplyForm from "../forms/ReplyForm";
import { Comment } from "../../type/types";
import ReplySection from "../reply/ReplySection";

type Props = {
  comment: Comment;
};

function CommentItem({ comment }: Props) {
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
            {comment.userName} •{" "}
            {formatDistanceToNow(new Date(comment.createdAt))} ago
          </p>
        </div>

        <p className="p-2">{comment.content}</p>
        <div className="flex justify-between pl-2 pb-4 border-b border-gray-400">
          <button className="text-gray-600" onClick={toggleReplySection}>
            <FontAwesomeIcon icon={faComment} className="w-4.5 h-4.5 mr-2" />
            Reply
          </button>
        </div>
        {showReply && <ReplySection />}
        {showReply && <ReplyForm />}
      </li>
    </div>
  );
}

export default CommentItem;
