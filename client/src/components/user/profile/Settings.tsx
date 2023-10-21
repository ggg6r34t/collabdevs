import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FeedbackReportingForm from "../../forms/FeedbackReportingForm";

function Settings() {
  const [userMedia, setUserMedia] = useState({ avatar: null, banner: null });

  const handleMediaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    mediaType: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const param = useParams();
  const userId = param.userId as string | undefined;

  return (
    <div className="p-2">
      <div className="max-w-4xl mx-auto my-6 p-6 bg-gray-100 rounded-lg dark:bg-slate-800">
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* change banner */}
            <div>
              <label className="text-gray-600 dark:text-white block ml-2 mb-2">
                Change Banner
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="banner-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleMediaChange(e, "banner")}
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
                className="text-gray-600 dark:text-white block ml-2 mb-2"
              >
                Email Notifications
              </label>
              <select
                id="email-notifications"
                className="bg-gray-100 dark:bg-slate-800 dark:text-white border border-gray-400 rounded-md p-2"
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
                className="text-gray-600 dark:text-white block ml-2 mb-2"
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
                  {/* controls who can view profile, set to be either public or private */}
                  <label htmlFor="profile-visibility">Profile Visibility</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email-visibility"
                    className="mr-2"
                  />
                  {/*  choose to make email address either visible or hidden */}
                  <label htmlFor="email-visibility">Email Visibility</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="friend-requests"
                    className="mr-2"
                  />
                  {/* allow or restrict friend requests from other users */}
                  <label htmlFor="friend-requests">Allow Friend Requests</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="message-privacy"
                    className="mr-2"
                  />
                  {/* manage who can send you direct messages or private messages */}
                  <label htmlFor="message-privacy">Message Privacy</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="search-visibility"
                    className="mr-2"
                  />
                  {/* control whether your profile appears in search results */}
                  <label htmlFor="search-visibility">Search Visibility</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="blocking" className="mr-2" />
                  {/* manage your block list and who can interact with you */}
                  <label htmlFor="blocking">Blocking</label>
                </div>
              </div>
            </div>

            {/* security settings */}
            <div>
              <label
                htmlFor="change-password"
                className="text-gray-600 dark:text-white block ml-2 mb-2"
              >
                Security Settings
              </label>
              <Link to={`/auth/change-password/${userId}`}>
                <button
                  id="change-password"
                  className="bg-[#010536] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  Change Password
                </button>
              </Link>
            </div>
            <FeedbackReportingForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
