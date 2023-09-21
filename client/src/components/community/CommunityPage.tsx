import { useState } from "react";

import Posts from "./Posts";
import SearchForm from "../forms/SearchForm";

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
  const [selectedSort, setSelectedSort] = useState("latest");

  return (
    <div className="container max-w-[1195px] mx-auto mt-12">
      <div className="grid grid-cols-3 gap-4">
        {/* search, filter, and trending topics */}
        <div className="mr-2 col-span-1">
          <div className="bg-white p-4 rounded-lg shadow">
            {/* search input */}
            <SearchForm />
            {/* sorting options */}
            <div className="mb-4">
              <label className="block text-sm font-semibold">Sort by:</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-2 py-1 border rounded-md"
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
            <div className="bg-white p-4 rounded-lg shadow">
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
        </div>

        {/* post feed */}
        <Posts />
      </div>
    </div>
  );
}

export default CommunityPage;
