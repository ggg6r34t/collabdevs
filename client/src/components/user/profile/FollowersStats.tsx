import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUserPlus,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";

function FollowersStats() {
  const [followers, setFollowers] = useState([
    { id: "1", username: "Follower1", isFollowing: false },
    { id: "2", username: "Follower2", isFollowing: true },
    { id: "3", username: "Follower3", isFollowing: true },
    { id: "4", username: "Follower4", isFollowing: true },
    { id: "5", username: "Follower5", isFollowing: true },
    { id: "6", username: "Follower6", isFollowing: true },
  ]);

  const [following, setFollowing] = useState([
    { id: "1", username: "Following1", isFollowing: false },
  ]);

  const handleFollowToggle = (
    user: { id: any; username?: string; isFollowing: any },
    isFollowersList: boolean
  ) => {
    const updatedFollowers = [...followers];
    const updatedFollowing = [...following];
    const index = updatedFollowers.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      const userToToggle = updatedFollowers[index];
      userToToggle.isFollowing = !user.isFollowing;

      if (user.isFollowing) {
        // unfollow action
        const followingIndex = updatedFollowing.findIndex(
          (u) => u.id === user.id
        );
        if (followingIndex !== -1) {
          updatedFollowing.splice(followingIndex, 1); // remove the user from the following list
        }
      } else {
        // follow action
        if (isFollowersList) {
          updatedFollowing.push(userToToggle);
          alert(`You followed ${user.username} in the followers list.`);
        }
      }

      setFollowers(updatedFollowers);
      setFollowing(updatedFollowing);

      // TODO: Send a request to the server to update the follow status here
    }
  };

  // calculate follower and following counts
  const followerCount = followers.length;
  const followingCount = following.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          Followers ({followerCount})
        </h2>
        <ul>
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="flex items-center justify-between mb-2"
            >
              <span>{follower.username}</span>
              <button
                onClick={() => handleFollowToggle(follower, true)}
                className={`px-2 py-1 rounded-full focus:outline-none ${
                  follower.isFollowing
                    ? "bg-[#010536] hover:bg-[#020a64] text-white"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
              >
                <FontAwesomeIcon
                  icon={follower.isFollowing ? faUserPlus : faCheck}
                  className="mr-1"
                />
                {follower.isFollowing ? "Follow" : "Following"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Following ({followingCount})
        </h2>
        <ul>
          {following.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between mb-2"
            >
              <span>{user.username}</span>
              <button
                onClick={() => handleFollowToggle(user, false)}
                className={`px-2 py-1 rounded-full focus:outline-none ${
                  user.isFollowing
                    ? "bg-[#010536] hover:bg-[#020a64] text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <FontAwesomeIcon
                  icon={user.isFollowing ? faUserPlus : faUserMinus}
                  className="mr-1"
                />
                {user.isFollowing ? "Follow" : "Unfollow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FollowersStats;
