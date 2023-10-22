import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { RootState } from "../../redux/store";
import { BASE_URL } from "../../api/api";
import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function CommentForm({ post }: Props) {
  const userToken = useSelector((state: RootState) => state.user.token);
  const [commentContent, setCommentContent] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleContentChange = (value: string) => {
    // remove <p> tags from the HTML content using DOMPurify
    const cleanedHTML = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [], // remove all HTML tags
    });
    setCommentContent(cleanedHTML);
  };

  const commentData = {
    content: commentContent,
    postId: post._id,
  };

  const validateInput = () => {
    if (!commentContent.trim()) {
      setValidationError("Comment content is required.");
      return false;
    }
    return true;
  };

  // function to create a new post
  const createComment = async (
    commentData: Partial<Post>,

    token: string | undefined
  ) => {
    if (!validateInput()) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/v1/posts/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <ReactQuill
        className="comment w-[605px] ml-12 mt-6 focus:outline-none focus:border-blue-50"
        scrollingContainer="null"
        placeholder="Your comment goes here..."
        value={commentContent}
        onChange={handleContentChange}
      />
      {validationError && (
        <div className="text-red-500 text-sm">{validationError}</div>
      )}
      <div className="w-[605px] h-[45px] flex items-center justify-end m-2 ml-12 mb-6">
        <button
          className="bg-[#010536] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
          onClick={() => {
            createComment(commentData, userToken!);
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
