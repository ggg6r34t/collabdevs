import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Posts from "./Posts";
import SearchForm from "../forms/SearchForm";
import { RootState } from "../../redux/store";
import { postActions } from "../../redux/slices/post";

// sample data for posts, trending topics, and user profiles
const mockTrendingTopics = [
  "ReactJS",
  "Node.js",
  "JavaScript",
  "Web Development",
];

const mockUserProfiles = [
  {
    id: 101,
    username: "janedev",
    fullName: "Jane Smith",
  },
  {
    id: 102,
    username: "john0xc5",
    fullName: "Jone Doe",
  },
];

function CommunityPage() {
  const selectedSort = useSelector(
    (state: RootState) => state.posts.selectedSort
  );
  const dispatch = useDispatch();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    dispatch(postActions.setSelectedSort(newSort));
  };

  const footerLinks = [
    { text: "Terms", url: "/legal/terms-of-service" },
    { text: "Privacy", url: "/legal/privacy-policy" },
    { text: "About", url: "/about-us" },
    { text: "Blog", url: "/blog" },
    { text: "Code of Conduct", url: "legal/code-of-conduct" },
    { text: "FAQ", url: "/support/faq" },
  ];

  return (
    <div className="container max-w-[1195px] min-h-[785px] mx-auto mt-12">
      <div className="grid grid-cols-3 gap-4">
        {/* search, filter, and trending topics */}
        <div className="mr-2 col-span-1">
          <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow">
            {/* search input */}
            <SearchForm />
            {/* sorting options */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Sort by:</label>
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="w-full bg-gray-100 dark:bg-slate-800 dark:text-white px-2 py-1 border border-gray-400 rounded-md"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
              </select>
            </div>
            {/* trending topics */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Trending Topics</h2>
              <ul>
                {mockTrendingTopics.map((topic, index) => (
                  <li key={index} className="mb-1">
                    <span className="text-blue-500">#{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* user profiles */}
          <div className=" mt-4 col-span-1">
            <div className="bg-gray-100 dark:bg-slate-800 dark:text-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Recommended Connections
              </h2>
              <ul>
                {mockUserProfiles.map((profile) => (
                  <li key={profile.id} className="mb-2">
                    <div className="flex items-center">
                      <span className="font-semibold">{profile.username}</span>
                      <span className="text-gray-500 ml-2">
                        @{profile.username}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* footer Links */}
          <div className="mt-6 text-center">
            <div className="p-4 ">
              <ul className="flex justify-between space-x-4">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.url} className="text-gray-600">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Copyright notice */}
            <p className="text-gray-600 mb-1">
              Built with ❤️ by the Collaborative DevLink Team
            </p>
            <p className="text-gray-600">
              © 2023 CollabDev. All rights reserved.
            </p>
          </div>
        </div>

        {/* post feed */}
        <Posts />
      </div>
    </div>
  );
}

export default CommunityPage;
