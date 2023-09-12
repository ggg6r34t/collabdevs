import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const navigate = useNavigate();

  const handleTitleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value: React.SetStateAction<string>) => {
    setPostContent(value);
  };

  return (
    <div className="h-screen bg-white p-4 py-40 flex flex-row items-start justify-center">
      <div className="w-[738px] flex flex-col items-center justify-center border border-gray-400 rounded shadow p-4">
        <input
          type="text"
          className="w-[708px] h-[40px] mb-4 px-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <ReactQuill
          className="snow w-[724px] h-[242px] p-2 focus:outline-none focus:border-blue-50"
          scrollingContainer="null"
          placeholder="Your post goes here..."
          value={postContent}
          onChange={handleContentChange}
        />
        <div className="w-[724px] h-[45px] flex items-center justify-end p-1 mt-4 ">
          <button
            className="h-[35px] py-1 px-2 text-blue-500 border-2 rounded-[12px] hover:bg-blue-50 focus:outline-none "
            onClick={() => {
              console.log("Title:", title);
              console.log("Content:", postContent);
              navigate("/");
            }}
          >
            Create Post
          </button>
        </div>
      </div>
      <div className=" flex flex-col items-start justify-start ml-4 ">
        <div className="w-[273px] h-[275px] border border-gray-400 rounded shadow">
          <div className="p-4">
            <h3 className="text-xl font-semibold ">Hot topics 🔥🔥🔥</h3>
          </div>
          <div className="flex flex-col items-start justify-start p-1">
            <div className="p-3 pt-2 pb-0">
              <p className="text-gray-600">
                Web3 and the Future of the Internet
              </p>
            </div>
            <div className="pl-3">
              <p>@evans</p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start p-1">
            <div className="p-3 pt-2 pb-0">
              <p className="text-gray-600">
                Machine Learning in Mobile Apps: Practical Applications
              </p>
            </div>
            <div className="pl-3">
              <p>@zaka</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
