import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import CommentSection from "../comment/CommentSection";

function CommentForm() {
  const [commentContent, setCommentContent] = useState("");

  const handleContentChange = (value: React.SetStateAction<string>) => {
    setCommentContent(value);
  };

  return (
    <div className="flex flex-col">
      <ReactQuill
        className="comment w-[566px] ml-12 mt-6 focus:outline-none focus:border-blue-50"
        scrollingContainer="null"
        placeholder="Your comment goes here..."
        value={commentContent}
        onChange={handleContentChange}
      />
      <div className="w-[566px] h-[45px] flex items-center justify-end m-2 ml-12 mb-6">
        <button
          className="h-[35px] py-1 px-2 text-blue-500 border-2 rounded-[12px] hover:bg-blue-50 focus:outline-none"
          onClick={() => {
            console.log("Content:", commentContent);
          }}
        >
          Add Comment
        </button>
      </div>
      <CommentSection />
    </div>
  );
}

export default CommentForm;
