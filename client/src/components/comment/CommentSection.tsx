import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentItem from "./CommentItem";
import CommentForm from "../forms/CommentForm";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCommentData } from "../../redux/thunk/comments";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function CommentSection({ post }: Props) {
  const { comments, hideComment, error } = useSelector(
    (state: RootState) => state.comments
  );

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(fetchCommentData(post._id));
  }, [fetchDispatch, post._id]);

  if (error) {
    return <div>Error fetching comments: {error.message}</div>;
  }

  return (
    <div>
      <ul className="mt-4">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} post={post} />
        ))}
      </ul>
      {hideComment && <CommentForm post={post} />}
    </div>
  );
}

export default CommentSection;
