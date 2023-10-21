import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AppDispatch } from "../../redux/store";
import { getUserList } from "../../redux/thunk/users";
import Posts from "../community/Posts";

// sample data for trending topics, and recommended connections
const mockTrendingTopics = [
  "ReactJS",
  "Node.js",
  "JavaScript",
  "Web Development",
];

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
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [recommendedConnections, setRecommendedConnections] = useState<
    { id: number; name: string; mutualConnections: number }[]
  >([]);

  useEffect(() => {
    // fetch data from an API here
    setTrendingTopics(mockTrendingTopics);
    setRecommendedConnections(mockRecommendedConnections);
  }, []);

  const fetchDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchDispatch(getUserList());
  }, [fetchDispatch]);

  const footerLinks = [
    { text: "Terms", url: "/legal/terms-of-service" },
    { text: "Privacy", url: "/legal/privacy-policy" },
    { text: "About Us", url: "/about-us" },
    { text: "Blog", url: "/blog" },
    { text: "Code of Conduct", url: "legal/code-of-conduct" },
    { text: "FAQ", url: "/support/faq" },
  ];

  return (
    <div className="container max-w-[1195px] min-h-[779px] mx-auto mt-12">
      <div className="grid grid-cols-3 gap-4">
        {/* trending topics */}
        <div className="mr-2 col-span-1">
          <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
            <ul>
              {trendingTopics.map((topic, index) => (
                <li key={index} className="mb-2">
                  <span className="text-blue-500">#{topic}</span>
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
                    <Link
                      to={link.url}
                      className="text-blue-600 hover:underline transition duration-300"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Copyright notice */}
            <p className="mt-2 text-gray-600">
              Made with ❤️ by The Collaborative DevLink Team
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
