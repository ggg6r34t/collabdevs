import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import { useUserSession } from "../../../hooks/authentication/useUserSession";
import { getUserDetails } from "../../../redux/thunk/users";
import Overview from "./Overview";
import Settings from "./Settings";
import UserPosts from "./UserPosts";
import FollowersStats from "./FollowersStats";

function Profile() {
  const currentUser = useSelector((state: RootState) => state.user.userProfile);
  const [userMedia, setUserMedia] = useState({ avatar: null, banner: null });
  const [selectedTab, setSelectedTab] = useState("overview"); // default tab

  const dispatch = useDispatch();
  const fetchDispatch = useDispatch<AppDispatch>();

  const { getUserSession } = useUserSession();

  const handleMediaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mediaType: string
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setUserMedia({
            ...userMedia,
            [mediaType]: e.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // render content based on the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "overview":
        return <Overview />;

      case "posts":
        return <UserPosts />;

      case "followersFollowing":
        return <FollowersStats />;

      case "settings":
        return <Settings />;

      default:
        return null;
    }
  };

  const tabs = ["overview", "posts", "followersFollowing", "settings"];

  const { userId } = useParams<{ userId: string | undefined }>();

  useEffect(() => {
    if (userId) {
      fetchDispatch(getUserDetails(userId));
    }
  }, [dispatch, fetchDispatch, userId]);

  const { profileOwnerId } = getUserSession();

  const isProfileOwner = currentUser && currentUser._id === profileOwnerId;

  if (isProfileOwner) {
    return (
      <div className="max-w-4xl min-h-[777px] mx-auto my-6 p-6 bg-gray-100 shadow-lg rounded-lg dark:bg-slate-800">
        {/* user banner */}
        <div className="h-60 bg-gradient-to-r bg-center from-blue-500 to-purple-500 rounded-t-lg relative overflow-hidden">
          <img
            src={userMedia.banner || currentUser.banner}
            alt="User Banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* user avatar */}
        <div className="flex justify-center mt-[-64px]">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="relative">
              <img
                src={
                  userMedia.avatar ||
                  currentUser.avatar ||
                  "/default-avatar.jpg"
                }
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-white hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-40 transition duration-300 ease-in-out">
                <label
                  htmlFor="avatar-upload"
                  className="text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                >
                  Change Avatar
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleMediaChange(e, "avatar")}
                />
              </div>
            </div>
          </label>
        </div>

        {/* tabs for navigation */}
        <div className="flex justify-center mt-8 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 mx-2 rounded-t-lg transition duration-300 ease-in-out focus:outline-none ${
                selectedTab === tab
                  ? "bg-[#010536] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === "followersFollowing"
                ? "Followers & Following"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {/* render tab content */}
        {renderTabContent()}
      </div>
    );
  } else if (!isProfileOwner) {
    return (
      <div className="max-w-4xl min-h-[777px] mx-auto my-6 p-6 bg-white shadow-lg rounded-lg dark:bg-slate-800">
        {/* user banner */}
        <div className="h-60 bg-gradient-to-r bg-center from-blue-500 to-purple-500 rounded-t-lg relative overflow-hidden">
          <img
            src={currentUser?.banner}
            alt="User Banner"
            className="w-full h-full object-cover"
          />
        </div>
        {/* user avatar */}
        <div className="flex justify-center mt-[-64px]">
          <label htmlFor="avatar-upload">
            <div className="relative">
              <img
                src={currentUser?.avatar || "/default-avatar.jpg"}
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
          </label>
        </div>
        <Overview />
      </div>
    );
  } else {
    return (
      <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Oops, there's no user data!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            It seems like there's no user data available. You might want to{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              go back to the homepage
            </Link>{" "}
            and explore from there.
          </p>
        </div>
      </div>
    );
  }
}
export default Profile;
