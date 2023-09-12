import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReplyForm() {
  const [replyContent, setReplyContent] = useState("");

  const handleContentChange = (value: React.SetStateAction<string>) => {
    setReplyContent(value);
  };

  return (
    <div className="h-[255px]">
      <ReactQuill
        className="reply w-[466px] ml-12 mt-6 focus:outline-none focus:border-blue-50"
        scrollingContainer="null"
        placeholder="Your reply goes here..."
        value={replyContent}
        onChange={handleContentChange}
      />
      <div className="w-[466px] h-[40px] flex items-center justify-end m-2 ml-12 mb-6">
        <button
          className="h-[35px] py-1 px-2 text-blue-500 border-2 rounded-[12px] hover:bg-blue-50 focus:outline-none"
          onClick={() => {
            console.log("Content:", replyContent);
          }}
        >
          Add Reply
        </button>
      </div>
    </div>
  );
}

export default ReplyForm;
