import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import PostItem from "../../community/PostItem";

function UserPosts() {
  const userPosts = useSelector(
    (state: RootState) => state.posts.postsByUserId
  );

  if (!userPosts) {
    // loading state
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Your Posts</h2>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (userPosts.length === 0) {
    // no posts available
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">My Posts</h2>
        <div className="flex items-center justify-center p-8">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-600">
              No posts available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // render user posts
  return (
    <div className="p-6">
      {userPosts.map((post) => (
        <div
          key={post._id}
          className="bg-white dark:bg-slate-800 border border-gray-600 p-4 rounded-lg shadow mb-4"
        >
          <PostItem post={post} />
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
