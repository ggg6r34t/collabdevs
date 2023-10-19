import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import companyLogoWhite from "../../assets/images/logos/collabdev_color_transparent_bg_2.png";
import companyLogoBlack from "../../assets/images/logos/collabdev_black_transparent_bg_2.png";

function AboutUs() {
  const darkMode = useSelector((state: RootState) => state.themes.mode);
  const localStorageDarkMode = localStorage.getItem("darkMode") === "true";

  return (
    <div className="min-h-screen dark:bg-slate-900 p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-4xl font-semibold mb-6 text-blue-600 dark:text-blue-300">
        Our Story
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-2">
          {localStorageDarkMode || darkMode ? (
            <img
              src={companyLogoWhite}
              alt="CollabDev Team"
              className="object-cover h-full w-full"
            />
          ) : (
            <img
              src={companyLogoBlack}
              alt="CollabDev Team"
              className="object-cover h-full w-full"
            />
          )}
        </div>
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            At CollabDev, we are on a mission to empower developers, foster
            collaboration, and create a vibrant community where you can thrive.
          </p>
          <p className="mb-4">
            CollabDev was founded by a group of passionate developers who
            envisioned a space where coding enthusiasts, professionals, and
            beginners could come together to learn, share ideas, and collaborate
            on projects.
          </p>
          <p className="mb-4">
            We are committed to providing a safe and inclusive environment for
            all developers. We encourage you to express your unique voice and
            creativity, and we support open-source initiatives.
          </p>
          <p>
            Join us in this exciting journey of knowledge exchange, innovation,
            and building the future of technology. Let's code, learn, and grow
            together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
