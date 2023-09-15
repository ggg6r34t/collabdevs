import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReplyItem from "./ReplyItem";
import ReplyForm from "../forms/ReplyForm";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchReplyData } from "../../redux/thunk/replies";
import { Comment, Post } from "../../type/types";

type Props = {
  comment: Comment;
  post: Post;
};

function ReplySection({ comment, post }: Props) {
  const { replies, error } = useSelector((state: RootState) => state.replies);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(fetchReplyData(comment._id));
  }, [fetchDispatch, comment._id]);

  if (error) {
    return <div>Error fetching comments: {error.message}</div>;
  }

  return (
    <div>
      <ul className="mt-4">
        {replies.map((reply, index) => (
          <ReplyItem key={index} reply={reply} />
        ))}
      </ul>
      <ReplyForm comment={comment} post={post} />
    </div>
  );
}

export default ReplySection;
