import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { fetchSavedPostData } from "../../redux/thunk/savedPosts";
import { AppDispatch, RootState } from "../../redux/store";
import SavedPostItem from "./SavedPostItem";

function SavedPosts() {
  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts
  );

  const fetchDispatch = useDispatch<AppDispatch>();

  const param = useParams();
  const userId = param.id as string | undefined;

  useEffect(() => {
    fetchDispatch(fetchSavedPostData(userId));
  }, [fetchDispatch, userId, param]);

  return (
    <div className="container min-h-screen p-6 mx-auto max-w-screen-xl mt-20">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-300">
        Saved Posts
      </h2>
      {savedPosts.length === 0 ? (
        <div className="flex items-center justify-center p-8">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-600">
              You have not saved a post yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {savedPosts.map((savedPost) => (
            <SavedPostItem key={savedPost._id} savedPost={savedPost} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPosts;
