import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

import ReplySection from "../reply/ReplySection";
import { RootState } from "../../redux/store";
import { replyActions } from "../../redux/slices/reply";
import { Comment, Post } from "../../type/types";
import { commentActions } from "../../redux/slices/comment";

type Props = {
  comment: Comment;
  post: Post;
};

function CommentItem({ comment, post }: Props) {
  const showReply = useSelector(
    (state: RootState) => state.replies.showReply[comment._id]
  );

  const dispatch = useDispatch();

  const toggleReplySection = () => {
    dispatch(replyActions.toggleShowReply(comment._id));
    dispatch(commentActions.toggleHideComment());
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
        {showReply && <ReplySection comment={comment} post={post} />}
      </li>
    </div>
  );
}

export default CommentItem;
