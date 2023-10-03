import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { RootState } from "../../redux/store";
import { Comment, Post } from "../../type/types";
import { BASE_URL } from "../../api/api";

type Props = {
  comment: Comment;
  post: Post;
};

function ReplyForm({ comment, post }: Props) {
  const userToken = useSelector((state: RootState) => state.user.token);
  const [replyContent, setReplyContent] = useState("");

  const handleContentChange = (value: string) => {
    // remove <p> tags from the HTML content using DOMPurify
    const cleanedHTML = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // remove all HTML tags
    });
    setReplyContent(cleanedHTML);
  };

  const replyData = {
    content: replyContent,
    postId: post._id,
    commentId: comment._id,
  };

  // function to create a new post
  const createReply = async (
    replyData: Partial<Post>,
    token: string | undefined
  ) => {
    try {
      await axios.post(`${BASE_URL}/api/v1/replies/`, replyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="h-[255px]">
      <ReactQuill
        className="reply w-[540px] ml-12 mt-6 focus:outline-none focus:border-blue-50"
        scrollingContainer="null"
        placeholder="Your reply goes here..."
        value={replyContent}
        onChange={handleContentChange}
      />
      <div className="w-[540px] h-[40px] flex items-center justify-end m-2 ml-12 mb-6">
        <button
          className="h-[35px] py-1 px-2 text-blue-500 border-2 rounded-[12px] hover:bg-blue-50 focus:outline-none"
          onClick={() => {
            createReply(replyData, userToken!);
          }}
        >
          Add Reply
        </button>
      </div>
    </div>
  );
}

export default ReplyForm;
