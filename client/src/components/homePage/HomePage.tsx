import { useState, useEffect } from "react";
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

  return (
    <div className="container max-w-[1195px] mx-auto mt-12">
      <div className="grid grid-cols-3 gap-4">
        {/* trending topics */}
        <div className="mr-2 col-span-1">
          <div className="bg-white p-4 rounded-lg shadow">
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
            <div className="bg-white p-4 rounded-lg shadow">
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
        </div>

        {/* posts feed */}
        <Posts />
      </div>
    </div>
  );
}

export default HomePage;
