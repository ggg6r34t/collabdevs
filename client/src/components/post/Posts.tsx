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
import Post from "./PostItem";
import TrendingProjects from "../trending/TrendingProjects";

function Posts() {
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
          {posts.map((post) => (
            <div key={post._id} className="mb-4">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
      <TrendingProjects />
    </div>
  );
}

export default Posts;
