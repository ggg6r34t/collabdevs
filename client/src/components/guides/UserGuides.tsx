import React from "react";

function UserGuides() {
  const guides = [
    {
      title: "Getting Started with CollabDev",
      description:
        "Learn the basics of setting up your CollabDev account and profile.",
      link: "/guides/getting-started",
    },
    {
      title: "Creating and Managing Developer Groups",
      description:
        "Discover how to create and manage developer groups for collaboration.",
      link: "/guides/developer-groups",
    },
    {
      title: "Contributing to Open Source Projects",
      description:
        "Find out how you can contribute to open-source projects on CollabDev.",
      link: "/guides/open-source-contributions",
    },
    {
      title: "Advanced Coding Techniques",
      description:
        "Explore advanced coding techniques and best practices shared by the community.",
      link: "/guides/advanced-coding",
    },
  ];

  return (
    <div className="min-h-screen p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-3xl font-semibold mb-4 text-blue-600 dark:text-blue-300">
        User Guides and Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <a
            key={index}
            href={guide.link}
            className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 shadow-md transition transform hover:scale-105 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-white">
              {guide.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {guide.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
export default UserGuides;
