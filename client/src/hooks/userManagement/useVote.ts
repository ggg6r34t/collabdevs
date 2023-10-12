import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export function useVote(
  postId: string,
  userId: string | undefined,
  token: string | undefined
) {
  const [voteError, setVoteError] = useState<string | null>(null);

  // function to update the voteScore in both state and localStorage
  const updateVoteScore = (postId: string, newVoteScore: number) => {
    localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/posts/${postId}/${voteType}`,
        userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newVoteScore = response.data.voteScore;
      updateVoteScore(postId, newVoteScore);
      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
    } catch (error) {
      setVoteError(
        error instanceof Error
          ? error.message
          : "An error occurred while voting."
      );
      console.error("An error occurred while voting:", error);
    }
  };

  return {
    voteError,
    handleUpvote: () => handleVote("upvote"),
    handleDownvote: () => handleVote("downvote"),
  };
}
