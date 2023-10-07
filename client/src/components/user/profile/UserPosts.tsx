import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import PostItem from "../../community/PostItem";

function UserPosts() {
  const userPosts = useSelector(
    (state: RootState) => state.posts.postsByUserId
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
      {userPosts ? (
        userPosts.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-gray-600">
                No posts available.
              </p>
            </div>
          </div>
        ) : (
          userPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-slate-800 border border-gray-200 p-4 rounded-lg shadow mb-4"
            >
              <PostItem post={post} />
            </div>
          ))
        )
      ) : (
        <p className="text-gray-500">Loading posts...</p>
      )}
    </div>
  );
}

export default UserPosts;
