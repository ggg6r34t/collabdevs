import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch, RootState } from "../../redux/store";
import { getUserList } from "../../redux/thunk/users";
import Posts from "../community/Posts";
import { fetchTrendingTopics } from "../../redux/thunk/posts";

// // sample data for trending topics, and recommended connections
// const mockTrendingTopics = [
//   "ReactJS",
//   "Node.js",
//   "JavaScript",
//   "Web Development",
// ];

const mockRecommendedConnections = [
  {
    id: 101,
    name: "Jane Smith",
    mutualConnections: 5,
  },
  {
    id: 102,
    name: "John Doe",
    mutualConnections: 23,
  },
  {
    id: 103,
    name: "Celine James",
    mutualConnections: 15,
  },
];

function HomePage() {
  const trendingTopics = useSelector(
    (state: RootState) => state.posts.trendingTopics
  );
  const [recommendedConnections, setRecommendedConnections] = useState<
    { id: number; name: string; mutualConnections: number }[]
  >([]);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // fetch data from an API here
    fetchDispatch(fetchTrendingTopics());
    setRecommendedConnections(mockRecommendedConnections);
    fetchDispatch(getUserList());
  }, [fetchDispatch]);

  const footerLinks = [
    { text: "Terms", url: "/legal/terms-of-service" },
    { text: "Privacy", url: "/legal/privacy-policy" },
    { text: "About", url: "/about-us" },
    { text: "Blog", url: "/blog" },
    { text: "Code of Conduct", url: "legal/code-of-conduct" },
    { text: "FAQ", url: "/support/faq" },
  ];

  return (
    <div className="container max-w-[1195px] min-h-screen mx-auto mt-12">
      <div className="grid grid-cols-3 gap-4">
        {/* trending topics */}
        <div className="mr-2 col-span-1">
          <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
            <ul>
              {trendingTopics.slice(0, 4).map((topic) => (
                <li key={topic._id} className="mb-1">
                  <span className="text-blue-500">
                    #{topic.title.slice(0, 12)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* recommended connections */}
          <div className="mt-4 col-span-1">
            <div className="bg-gray-100 dark:bg-slate-800  p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Recommended Connections
              </h2>
              <ul>
                {recommendedConnections.map((connection) => (
                  <li key={connection.id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{connection.name}</span>
                      <span className="text-gray-500">
                        {connection.mutualConnections} mutual connections
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

        {/* posts feed */}
        <Posts />
      </div>
    </div>
  );
}

export default HomePage;
