import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostData } from "../../redux/thunk/posts";
import Post from "./PostItem";
import SearchResult from "../searchResult/SearchResult";
import PostItemSkeleton from "../loaders/PostItemSkeleton";

function Posts() {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const isLoading = useSelector((state: RootState) => state.posts.isLoading);
  const isSearchActive = useSelector(
    (state: RootState) => state.posts.isSearchActive
  );
  const selectedSort = useSelector(
    (state: RootState) => state.posts.selectedSort
  );

  const location = useLocation();

  const fetchDispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDispatch(fetchPostData());
  }, [fetchDispatch]);

  function handleQuillClick() {
    navigate("/create-post");
  }

  // sort posts based on selectedSort
  const sortedPosts = [...posts];
  if (selectedSort === "latest") {
    sortedPosts.sort((a, b) => {
      // types for a and b
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (selectedSort === "popular") {
    sortedPosts.sort((a, b) => {
      // types for a and b
      const votesA = a.voteScore || 0;
      const votesB = b.voteScore || 0;
      return votesB - votesA;
    });
  }

  // skeleton post loader
  if (isLoading) {
    return <PostItemSkeleton />;
  }

  return (
    <div className="col-span-2">
      {location.pathname === "/" || isSearchActive ? null : (
        <div className="w-full bg-gray-100 dark:bg-slate-800 h-4 p-2 mb-4 rounded-lg shadow flex flex-row items-center justify-center">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full mr-4">
            <img
              src="https://e7.pngegg.com/pngimages/973/940/png-clipart-laptop-computer-icons-user-programmer-laptop-electronics-computer-thumbnail.png"
              alt="User Avatar"
              className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full mr-4"
            />
          </div>
          <div onClick={handleQuillClick}>
            <ReactQuill
              className="my-custom-quill w-[40rem] h-[3rem] border border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500"
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
      )}

      {/* filtered and sorted posts */}
      <div>
        {isSearchActive ? (
          // render search results based on isSearchActive
          <SearchResult />
        ) : (
          // render all posts when isSearchActive is false
          sortedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow mb-4"
            >
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Posts;
