import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchCommentData } from "../../redux/thunk/comments";
import CommentItem from "./Comment";

const comment = [
  {
    _id: "1",
    timestamp: "1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. Duis vel sem nec nibh
      porttitor congue. In mattis tincidunt tincidunt. Aliquam
      accumsan non nisi sit amet rutrum. `,
    author: "Habeeb",
  },
];

function CommentSection() {
  const comments = useSelector((state: RootState) => state.comments.comments);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(fetchCommentData());
  }, [fetchDispatch]);

  return (
    <div>
      <ul className="mt-4">
        {comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
