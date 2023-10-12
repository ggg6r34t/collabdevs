import axios from "axios";
import { useState } from "react";

export function useUpdateButtonColor(postId: string, colorState: boolean) {
  const [saveButtonColorError, setSaveButtonColorError] = useState<
    string | null
  >(null);

  // update the button color state for a post
  const updateButtonColor = async () => {
    try {
      const response = await axios.put("/api/v1/save/updatebuttoncolor", {
        postId,
        colorState,
      });

      if (response.status === 200) {
        // color state updated successfully
      } else {
        setSaveButtonColorError("Failed to update button color state.");
      }
    } catch (error) {
      setSaveButtonColorError(
        error instanceof Error
          ? error.message
          : "An error occurred while updating button color state."
      );
      console.error(
        "An error occurred while updating button color state:",
        error
      );
    }
  };

  return { updateButtonColor, saveButtonColorError };
}
