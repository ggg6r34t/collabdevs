import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { AppDispatch, RootState } from "../../../redux/store";
import { useUpdateUserProfile } from "../../../hooks/userManagement/useUpdateUserProfile";
import { getPostByUserId } from "../../../redux/thunk/users";
import { userActions } from "../../../redux/slices/user";
import { User } from "../../../type/types";

function Overview() {
  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const fetchDispatch = useDispatch<AppDispatch>();
  const { updateUserProfile } = useUpdateUserProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    headline: "",
    bio: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        headline: currentUser.headline,
        bio: currentUser.bio,
        socialLinks: { ...currentUser.socialLinks },
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      // fetch user posts (replace with your own API call)
      fetchDispatch(getPostByUserId(currentUser._id));
    }
  }, [currentUser, fetchDispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSocialLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value,
      },
    });
  };

  const handleSaveProfile = () => {
    // send updated profile data to the server
    const userId = currentUser?._id;
    updateUserProfile(userId, formData).then(() => {
      dispatch(userActions.updateUserProfile(formData as User));
      setIsEditing(false);
    });
  };

  if (currentUser) {
    const lastLoginFormatted = new Date(currentUser?.updatedAt).toLocaleString(
      undefined,
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return (
      <div className="p-2">
        <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg dark:bg-slate-800">
          {/* user bio and information */}
          <h2 className={isEditing ? undefined : "text-lg font-semibold"}>
            {isEditing ? (
              <>
                <label
                  htmlFor="firstName"
                  className="block font-medium text-gray-700 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 p-2 dark:bg-slate-700 border rounded-md w-full"
                />
                <label
                  htmlFor="lastName"
                  className="block mt-4 font-medium text-gray-700 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 p-2 dark:bg-slate-700 border rounded-md w-full"
                />
              </>
            ) : (
              `${formData.firstName} ${formData.lastName}`
            )}
          </h2>

          {isEditing ? (
            <>
              <label
                htmlFor="headline"
                className="block mt-4 font-medium text-gray-700 dark:text-white"
              >
                Headline
              </label>
              <input
                type="text"
                id="headline"
                name="headline"
                placeholder="Enter your profile headline"
                value={formData.headline}
                onChange={handleChange}
                className="mt-1 p-2 dark:bg-slate-700 border rounded-md w-full"
              />

              <label
                htmlFor="email"
                className="block mt-4 font-medium text-gray-700 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 dark:bg-slate-700 border rounded-md w-full"
              />
            </>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-white">
                Headline: {formData.headline || "No headline provided"}
              </p>
              {currentUser.email ? (
                <p className="text-gray-600 dark:text-white">
                  Email: {currentUser.email}
                </p>
              ) : (
                <div>
                  <p className="text-gray-600 dark:text-white">
                    Email: Not provided
                  </p>
                  <button
                    onClick={() => console.log("Clicked")}
                    className="mt-2 px-4 py-2 bg-[#010536] text-white rounded-md transition duration-300 ease-in-out"
                  >
                    Provide Email
                  </button>
                </div>
              )}
              <p className="text-gray-600 dark:text-white">
                Location: City, Country
              </p>
              <p className="text-gray-600 dark:text-white">
                Last Login: {lastLoginFormatted}
              </p>
            </div>
          )}

          {/* bio */}
          {isEditing ? (
            <>
              <h3 className="mt-6 font-semibold">Bio</h3>
              <textarea
                name="bio"
                placeholder="Your bio helps others get to know you better..."
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-[784px] h-[200px] dark:bg-slate-700 mt-1 border rounded-md"
              />
            </>
          ) : (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Bio</h3>
              <p className="text-gray-700 dark:text-white">
                {formData.bio || "No bio provided"}
              </p>
            </div>
          )}

          {/* social links */}
          <div className="mt-8">
            <h3
              className={`${isEditing ? undefined : "text-lg "} font-semibold`}
            >
              Social Links
            </h3>
            <div className="space-y-2 mt-2">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="twitter"
                      className="text-gray-700 dark:text-white mb-1"
                    >
                      Twitter Profile
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleSocialLinksChange}
                      placeholder="Enter your Twitter profile URL"
                      className="dark:bg-slate-700 border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="linkedin"
                      className="text-gray-700 dark:text-white mb-1"
                    >
                      LinkedIn Profile
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleSocialLinksChange}
                      placeholder="Enter your LinkedIn profile URL"
                      className="dark:bg-slate-700 border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="github"
                      className="text-gray-700 dark:text-white mb-1"
                    >
                      GitHub Profile
                    </label>
                    <input
                      type="text"
                      name="github"
                      id="github"
                      value={formData.socialLinks.github}
                      onChange={handleSocialLinksChange}
                      placeholder="Enter your GitHub profile URL"
                      className="dark:bg-slate-700 border rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {formData.socialLinks.twitter ? (
                    <a
                      href={formData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-700 dark:hover:text-gray-900 mr-2"
                    >
                      <FontAwesomeIcon
                        icon={faSquareXTwitter}
                        className="w-5 h-5"
                      />
                    </a>
                  ) : (
                    <div className="text-gray-400">No Twitter Profile</div>
                  )}

                  {formData.socialLinks.linkedin ? (
                    <a
                      href={formData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                    </a>
                  ) : (
                    <div className="text-gray-400">No LinkedIn Profile</div>
                  )}

                  {formData.socialLinks.github ? (
                    <a
                      href={formData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-600 mr-2"
                    >
                      <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                    </a>
                  ) : (
                    <div className="text-gray-400">No GitHub Profile</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* edit and save Buttons */}
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="bg-[#010536] text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#010536] text-white py-2 px-4 mt-4 rounded-md transition duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          )}
        </div>
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
export default Overview;
