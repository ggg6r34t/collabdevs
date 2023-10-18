import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import CompanyBlackLogo from "../../../assets/images/logos/collabdev_black_transparent_bg.png";
import CompanyWhiteLogo from "../../../assets/images/logos/collabdev_white_transparent_bg.png";
import { RootState } from "../../../redux/store";

function Footer() {
  const darkMode = useSelector((state: RootState) => state.themes.mode);
  const localStorageDarkMode = localStorage.getItem("darkMode") === "true";

  return (
    <footer className="bg-white dark:bg-slate-900 dark:text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="no-uderline">
          <div className="flex items-center ml-44">
            {localStorageDarkMode || darkMode ? (
              <img
                src={CompanyWhiteLogo}
                alt="Logo"
                className="w-10 mr-2 transition"
              />
            ) : (
              <img
                src={CompanyBlackLogo}
                alt="Logo"
                className="w-10 mr-2 transition"
              />
            )}
            <span className="text-xl font-bold">CollabDev</span>
          </div>
        </Link>
        <div className="flex items-between mr-44 space-x-20">
          <Link
            to="legal/terms-of-service"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            Terms
          </Link>
          <Link
            to="legal/privacy-policy"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            Privacy
          </Link>
          <Link
            to="/about-us"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            About Us
          </Link>
          <Link
            to="/blog"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            Blog
          </Link>
          <Link
            to="/"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            Docs
          </Link>
          <Link
            to="/support/faq"
            className="text-gray-600 dark:text-white hover:text-gray-800"
          >
            FAQ
          </Link>
          <div className="relative group">
            <Link
              to="/"
              className="text-gray-600 dark:text-white hover:text-gray-800"
            >
              ?
            </Link>
            <div className="dropdown-shape-footer absolute bottom-[2rem] right-[-56px] transform -translate-x-1/2 hidden group-hover:block bg-white border border-gray-300 rounded-[12px] p-2 shadow-lg z-10">
              <p className="w-16 text-sm dark:text-black">Help Desk</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
