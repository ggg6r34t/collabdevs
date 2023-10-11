import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export function useSavePost(userId: string | undefined, postId: string) {
  const [isSaved, setIsSaved] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleSavePost = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/savedposts/save`, {
        userId,
        postId,
      });

      if (response.status === 201) {
        setIsSaved(true);
      } else {
        setError(`Failed to save post. Status code: ${response.status}`);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the post."
      );
    }
  };

  const handleRemoveSavedPost = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/savedposts/${userId}/${postId}`
      );

      if (response.status === 204) {
        setIsSaved(false);
      } else {
        setError(
          `Failed to remove saved post. Status code: ${response.status}`
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while removing the saved post."
      );
    }
  };

  return { isSaved, error, handleSavePost, handleRemoveSavedPost };
}
