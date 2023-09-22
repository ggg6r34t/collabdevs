import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TrendingProjectItem from "./TrendingProjectItem";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostData } from "../../redux/thunk/posts";
import fire from "../../assets/fire.gif";

function TrendingProjects() {
  const posts = useSelector((state: RootState) => state.posts.posts);

  // posts sorted based on voteScore in descending order
  const sortedPosts = [...posts].sort((a, b) => b.voteScore - a.voteScore);

  // top 3 to 4 posts
  const topPosts = sortedPosts.slice(0, 3);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(fetchPostData());
  }, [fetchDispatch]);

  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        Trending Topics
        <span className="flex flex-row ml-2">
          <img className="w-6 h-6" src={fire} alt="fire" />
          <img className="w-6 h-6" src={fire} alt="fire" />
          <img className="w-6 h-6" src={fire} alt="fire" />
        </span>
      </h3>
      <div className="flex flex-col space-y-2">
        {topPosts.map((post) => (
          <div key={post._id}>
            <TrendingProjectItem post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingProjects;
