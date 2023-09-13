import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchReplyData } from "../../redux/thunk/replies";
import ReplyItem from "./Reply";

function ReplySection() {
  const replies = useSelector((state: RootState) => state.replies.replies);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(fetchReplyData());
  }, [fetchDispatch]);

  return (
    <div>
      <ul className="mt-4">
        {replies.map((reply, index) => (
          <ReplyItem key={index} reply={reply} />
        ))}
      </ul>
    </div>
  );
}

export default ReplySection;
