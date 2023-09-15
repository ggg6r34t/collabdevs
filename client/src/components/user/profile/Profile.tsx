import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setBanner(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { userId } = useParams<{ userId: string }>();
  const singleUserURL = `http://localhost:8000/api/v1/users/${userId}`;

  // Fetch user profile data when the component mounts
  useEffect(() => {
    axios
      .get(singleUserURL)
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [singleUserURL]);

  // const currentUser = useSelector(
  //   (state: RootState) => state.user.userInformation
  // );

  if (userProfile) {
    return (
      <div className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
        {/* user banner */}
        <div
          className="h-60 bg-gradient-to-r bg-center from-blue-500 to-purple-500 rounded-t-lg relative overflow-hidden"
          style={{
            backgroundImage: `url(${banner || "/default-banner.jpg"})`,
          }}
        ></div>

        {/* user avatar */}
        <div className="flex justify-center mt-[-64px]">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="relative">
              <img
                src={avatar || "/default-avatar.jpg"}
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
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </label>
        </div>

        {/* user details */}
        <div className="p-6">
          <h2 className="text-lg font-semibold">
            {userProfile.firstName} {userProfile?.lastName}
          </h2>
          <p className="text-gray-600">{userProfile.email}</p>
          <p className="text-gray-600">Location: City, Country</p>
          {/* <p >Last Login: {currentUser.lastLogin}</p>  */}c{/* about me */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-gray-700">
              👋 Hey there! I'm a passionate software engineer on a mission to
              craft elegant code and build innovative solutions. 💻 🌍 I thrive
              in the world of web development, with expertise in front-end
              technologies like React, Vue, and Tailwind CSS. I love creating
              beautiful, user-friendly interfaces that make a difference. 🧠
              When I'm not coding, you'll find me exploring new technologies,
              reading tech blogs, and contributing to open-source projects. I'm
              a lifelong learner, always seeking to expand my knowledge and
              skills. 🎮 Outside of the digital realm, I'm an avid gamer, a
              coffee enthusiast ☕, and a nature lover 🌿. I believe in
              work-life balance and finding inspiration in both pixels and the
              great outdoors. Let's connect, collaborate, and make magic in the
              world of code! 🚀 #DevLife #CodingIsArt
            </p>
          </div>
          {/* settings */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* change banner */}
              <div>
                <label className="text-gray-600 block ml-2 mb-2">
                  Change Banner
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="banner-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerChange}
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer bg-[#010536] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Upload
                  </label>
                </div>
              </div>

              {/* email notification preferences */}
              <div>
                <label
                  htmlFor="email-notifications"
                  className="text-gray-600 block ml-2 mb-2"
                >
                  Email Notifications
                </label>
                <select
                  id="email-notifications"
                  className="border rounded-md p-2"
                >
                  <option value="all">All Notifications</option>
                  <option value="important">Important Only</option>
                  <option value="none">No Email Notifications</option>
                </select>
              </div>

              {/* privacy settings */}
              <div>
                <label
                  htmlFor="privacy-settings"
                  className="text-gray-600 block ml-2 mb-2"
                >
                  Privacy Settings
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="profile-visibility"
                      className="mr-2"
                    />
                    <label htmlFor="profile-visibility">
                      Profile Visibility
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-visibility"
                      className="mr-2"
                    />
                    <label htmlFor="email-visibility">Email Visibility</label>
                  </div>
                </div>
              </div>

              {/* security settings */}
              <div>
                <label
                  htmlFor="change-password"
                  className="text-gray-600 block ml-2 mb-2"
                >
                  Security Settings
                </label>
                <button
                  id="change-password"
                  className="bg-[#010536] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Change Password
                </button>
              </div>

              {/* theme preferences */}
              <div>
                <label
                  htmlFor="theme-preferences"
                  className="text-gray-600 block ml-2 mb-2"
                >
                  Theme Preferences
                </label>
                <select
                  id="theme-preferences"
                  className="border rounded-md p-2"
                >
                  <option value="light">Light Theme</option>
                  <option value="dark">Dark Theme</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div> No data!!! redirecting to home... </div>;
  }
}
export default Profile;
