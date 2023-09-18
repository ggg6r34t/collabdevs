import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchPostData } from "../../redux/thunk/posts";
import TrendingProjectItem from "./TrendingProjectItem";

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
    <div className=" flex flex-col items-start justify-start p-4 ">
      <div className="w-[280px] h-[400px] border border-gray-400 rounded shadow p-4">
        <h3 className="text-xl font-semibold mb-4">Trending Projects 🔥🔥🔥</h3>
        <div className="flex flex-col space-y-2">
          {topPosts.map((post) => (
            <div key={post._id}>
              <TrendingProjectItem post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingProjects;
