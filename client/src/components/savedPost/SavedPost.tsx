import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SavedPostItem from "./SavedPostItem";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchSavedPostData } from "../../redux/thunk/savedPosts";
import { savedPostActions } from "../../redux/slices/savedPost";
import { SavedPost } from "../../type/types";

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
        {savedPosts.map((savedPost: SavedPost) => (
          <SavedPostItem
            key={savedPost._id}
            savedPost={savedPost}
            onRemove={() => removeSavedPost(savedPost._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedPosts;
