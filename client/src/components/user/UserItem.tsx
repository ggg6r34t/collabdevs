import { User } from "../../type/types";
import { useState } from "react";

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  //   const { profilePicture, username, firstName, headline, connections } = user;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const connections = 5;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFollow = () => {
    // follow action here
    console.log("Now following user");
    setIsDropdownOpen(false);
  };

  const handleDropdownAction = (action: string) => {
    // "dropdown menu actions here
    console.log(`Clicked on ${action}`);
  };

  return (
    <div className="max-w-md bg-white dark:bg-slate-800 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt={`${user.username}'s Profile`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl text-black dark:text-white font-semibold">
            {user.username || user.firstName}
          </h2>
          {/* <p className="text-gray-600">{user.headline}</p> */}
          <p className="text-gray-600 dark:text-gray-500">Frontend Developer</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-500">
          {connections}{" "}
          {connections.toString() === "1" ? "follower" : "followers"}
        </p>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="relative inline-block text-left">
          <div
            tabIndex={0}
            className="py-2 bg-[#010536] border-1 rounded-md focus:ring focus:border-blue-400 flex items-center"
            onClick={(e) => {
              e.currentTarget.focus(); // focus the div when it's clicked
            }}
          >
            <button
              onClick={handleFollow}
              className="px-4 bg-[#010536] text-white rounded-md"
            >
              Follow
            </button>
            <button
              onClick={toggleDropdown}
              className="px-2 bg-transparent text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          {/* dropdown content */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-[12rem] bg-white border rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => handleDropdownAction("Send a Message")}
                    className="text-black block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Send a Message
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleDropdownAction("Collaboration request")
                    }
                    className="text-black block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Collaboration request
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDropdownAction("Watch user")}
                    className="text-black block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Watch user
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDropdownAction("Star account")}
                    className="text-black block px-4 py-2 hover:bg-gray-200 w-full text-left"
                  >
                    Star account
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button className="px-4 py-2 bg-[#010536] text-white rounded-md focus:outline-none focus:ring focus:border-blue-400">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserItem;
