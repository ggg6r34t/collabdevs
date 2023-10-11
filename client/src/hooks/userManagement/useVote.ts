import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/api";

export function useVote(
  postId: string,
  userId: string | undefined,
  token: string | undefined
) {
  const [voteScore, setVoteScore] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

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
      setVoteScore(newVoteScore);
      localStorage.setItem(`voteScore_${postId}`, newVoteScore.toString());
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while voting."
      );
    }
  };

  return {
    voteScore,
    error,
    handleUpvote: () => handleVote("upvote"),
    handleDownvote: () => handleVote("downvote"),
  };
}
