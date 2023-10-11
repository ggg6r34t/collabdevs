import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

import CompanyLogo from "../../../assets/images/logos/collabdev_color_transparent_bg.png";
import { RootState } from "../../../redux/store";
import Notifications from "./Notifications";
import { useSignOut } from "../../../hooks/authentication/useSignOut";
import ToggleThemeMode from "../../switchTheme/ToggleThemeMode";

function Navbar() {
  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLogin);

  const savedPosts = useSelector(
    (state: RootState) => state.savedPosts.savedPosts
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    "New message received",
    "You have a new follower",
    "Event reminder: Meeting at 2 PM",
    "Weather update: Sunny today",
    "Congratulations! You earned a badge",
    "New article published",
  ]);

  const { signOut } = useSignOut();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setShowNotifications(false);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const notificationCount = savedPosts.length;

  console.log(notificationCount, "notificationCount");

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar sticky bg-[#010536] top-0 p-4 z-10 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="no-uderline">
          <div className="flex items-center">
            <div className="mr-4">
              <img src={CompanyLogo} alt="Logo" className="w-10 rounded-full" />
            </div>
            <div className="text-white text-2xl font-semibold">CollabDev</div>
          </div>
        </Link>
        <nav className="space-x-6 ml-28 mr-auto">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/community"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            Community
          </Link>
          <Link
            to="/support"
            className="text-white  hover:text-blue-200 transition duration-300"
          >
            Support
          </Link>
        </nav>

        {/* right section (User is logged in) */}
        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-2.5 relative">
              <button
                className="relative focus:outline-none"
                onClick={handleNotificationClick}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-6 h-6 text-white hover:text-blue-200 transition duration-300 cursor-pointer"
                />
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white absolute bottom-4 left-3 rounded-full min-w-[17px] h-[17px] text-center text-xs font-semibold">
                    {notifications.length}
                  </span>
                )}

                {showNotifications && (
                  <div className="min-w-full absolute top-8 -right-0.5 bg-white dark:bg-slate-800 p-2 rounded-md shadow-md">
                    <Notifications notifications={notifications} />
                  </div>
                )}
              </button>

              <div onClick={toggleDropdown} className="cursor-pointer">
                <img
                  src="https://e7.pngegg.com/pngimages/973/940/png-clipart-laptop-computer-icons-user-programmer-laptop-electronics-computer-thumbnail.png"
                  alt="User Avatar"
                  className="w-10 h-10 ml-1 rounded-full"
                />
              </div>

              {/* dropdown menu */}
              {isDropdownOpen && (
                <div
                  className="dropdown-shape absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10"
                  onClick={closeDropdown}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to={`/profile/${currentUser?._id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/saved-posts/${userInformation?._id}`}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      >
                        Saved
                      </Link>
                    </li>

                    <li>
                      {currentUser?.role === "user" && (
                        <Link
                          to="/give-feedback"
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                        >
                          Give Feedback
                        </Link>
                      )}
                    </li>
                    {currentUser?.role === "admin" ? (
                      <>
                        <li>
                          <Link
                            to="/feedback"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                          >
                            Feedback
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/users"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                          >
                            Users
                          </Link>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <div
                        onClick={signOut}
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                      >
                        Sign out
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="text-white hover:text-blue-200 transition duration-300">
              <p className="ml-2 text-lg font-semibold">
                Hello, {currentUser?.firstName}!
              </p>
            </div>
          </>
        ) : (
          // right section (User is not logged in)
          <div className="space-x-4">
            <Link
              to="/signin"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-white text-[#010536] hover:bg-blue-200 py-2 px-4 rounded-[12px] transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
        <ToggleThemeMode />
      </div>
    </div>
  );
}

export default Navbar;
