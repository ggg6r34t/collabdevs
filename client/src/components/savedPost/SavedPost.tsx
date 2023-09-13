import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchSavedPostData } from "../../redux/thunk/savedPosts";
import SavedPostItem from "./SavedPostItem";
import { Post } from "../../type/types";
import { savedPostActions } from "../../redux/slices/savedPost";
import { useParams } from "react-router";

function SavedPosts() {
  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts
  );

  const dispatch = useDispatch();
  const fetchDispatch = useDispatch<AppDispatch>();

  const removeSavedPost = (postId: string) => {
    dispatch(savedPostActions.removeSavedPost(postId));
  };

  const param = useParams();
  const userId = param.id as string | undefined;

  useEffect(() => {
    fetchDispatch(fetchSavedPostData(userId));
  }, [fetchDispatch, userId, param]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedPosts.map((post: Post) => (
          <SavedPostItem
            key={post._id}
            post={post}
            onRemove={() => removeSavedPost(post._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedPosts;
