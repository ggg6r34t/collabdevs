import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostData } from "../../redux/thunk/posts";
import Post from "./Post";

function PostSection() {
  const posts = useSelector((state: RootState) => state.posts.posts);

  const fetchDispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchDispatch(fetchPostData());
  }, [fetchDispatch]);

  function handleQuillClick() {
    navigate("/create-post");
  }
  return (
    <div className=" bg-white p-4 mb-4  flex flex-row items-start justify-center">
      <div className=" bg-white p-4 mb-4  flex flex-col items-center justify-center">
        <div className="w-640 h-4 p-2 rounded shadow flex flex-row items-center justify-center border border-gray-400">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
          <div onClick={handleQuillClick}>
            <ReactQuill
              className="my-custom-quill w-[30rem] h-[3rem] border rounded p-2 focus:outline-none focus:border-blue-500"
              theme="bubble"
              scrollingContainer="null"
              placeholder="What are you working on?"
            />
          </div>
          <button className=" text-gray-600 ml-3">
            <FontAwesomeIcon icon={faImage} className="w-40 h-40 " />
          </button>
          <button className=" text-gray-600 ml-3">
            <FontAwesomeIcon icon={faLink} className="w-40 h-40" />
          </button>
        </div>
        <div>
          {posts.map((post, index) => (
            <div key={index} className="mb-4">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
      <div className=" flex flex-col items-start justify-start p-4 ">
        <div className="w-[263px] h-[375px] border border-gray-400 rounded shadow">
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

export default PostSection;
