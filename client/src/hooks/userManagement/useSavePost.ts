import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { savedPostActions } from "../../redux/slices/savedPost";
import { BASE_URL } from "../../api/api";

export function useSavePost(userId: string | undefined, postId: string) {
  const [isSaved, setIsSaved] = useState<boolean | undefined>(undefined);
  const [savePostError, setSavePostError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/savedposts/save`, {
        userId,
        postId,
      });

      if (response.status === 201) {
        setIsSaved(true);
        localStorage.setItem(`saved_${userId}_${postId}`, "true");
      } else {
        setSavePostError(
          `Failed to save post. Status code: ${response.status}`
        );
      }
    } catch (error) {
      setSavePostError(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the post."
      );
      console.error("An error occurred while saving the post:", error);
    }
  };

  const handleRemoveSavedPost = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/savedposts/${userId}/${postId}`
      );

      if (response.status === 204) {
        setIsSaved(false);
        localStorage.setItem(`saved_${userId}_${postId}`, "false");
        dispatch(savedPostActions.removeSavedPost(postId));
      } else {
        setSavePostError(
          `Failed to remove saved post. Status code: ${response.status}`
        );
      }
    } catch (error) {
      setSavePostError(
        error instanceof Error
          ? error.message
          : "An error occurred while removing the saved post."
      );
      console.error("An error occurred while removing the saved post:", error);
    }
  };

  return {
    isSaved,
    setIsSaved,
    savePostError,
    handleSavePost,
    handleRemoveSavedPost,
  };
}
