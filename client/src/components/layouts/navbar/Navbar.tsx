import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import CompanyLogo from "../../../assets/images/logos/collabdev_color_transparent_bg.png";
import { RootState } from "../../../redux/store";
import { userActions } from "../../../redux/slices/user";

// mock User to test the navbar (right section) functionality

function Navbar() {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.user.userInformation
  );
  const isLoggedIn = useSelector((state: RootState) => state.user.isLogin);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="navbar sticky bg-[#010536] top-0 p-4 z-10 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="no-uderline">
          <div className="flex items-center">
            <div className="mr-4">
              <img src={CompanyLogo} alt="Logo" className="w-10 rounded-full" />
            </div>
            <div className="text-white text-2xl font-semibold">CollabDev</div>
          </div>
        </a>
        <nav className="space-x-6 ml-28 mr-auto">
          <a
            href="/"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            Home
          </a>
          <a
            href="/community"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            Community
          </a>
          <a
            href="/support"
            className="text-white  hover:text-blue-200 transition duration-300"
          >
            Support
          </a>
        </nav>

        {/* right section (User is logged in) */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4 relative">
            <FontAwesomeIcon
              icon={faBell}
              className="w-6 h-6 text-white hover:text-blue-200 transition duration-300 cursor-pointer"
            />
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
                    <a
                      href={`/profile/${currentUser?._id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/saved-posts/${userInformation?._id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Saved
                    </a>
                  </li>

                  <li>
                    <a
                      href="/feedbacks"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Feedbacks
                    </a>
                  </li>
                  {currentUser?.role === "admin" ? (
                    <li>
                      <a
                        href="/users"
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                      >
                        Users
                      </a>
                    </li>
                  ) : null}
                  <li>
                    <a
                      href="/" // can create logout component containing only logout function
                      onClick={signOut}
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="text-white hover:text-blue-200 transition duration-300">
              Hi! {currentUser?.firstName}
            </div>
          </div>
        ) : (
          // right section (User is not logged in)
          <div className="space-x-4">
            <a
              href="/signin"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Sign In
            </a>
            <a
              href="/signup"
              className="bg-white text-[#010536] hover:bg-blue-200 py-2 px-4 rounded-[12px] transition duration-300"
            >
              Sign Up
            </a>
          </div>
        )}
      </div>
    </div>
  );
  function signOut(): void {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");

    dispatch(userActions.removeUserData());
    navigate("/signin");
  }
}

export default Navbar;
