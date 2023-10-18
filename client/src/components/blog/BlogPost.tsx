import React, { useState } from "react";
import { Link } from "react-router-dom";

function BlogPost() {
  const [blogPosts] = useState([
    {
      id: 1,
      title: "The Future of Web Development",
      content:
        "Web development is constantly evolving. In this blog post, we explore the latest trends and technologies shaping the future of web development.",
      date: "October 18, 2023",
      author: "John Doe",
      category: "Web Development",
      tags: ["JavaScript", "React", "Trends"],
    },
    {
      id: 2,
      title: "Getting Started with React",
      content:
        "Are you new to React? This beginner-friendly guide will help you get started with React, one of the most popular JavaScript libraries for building user interfaces.",
      date: "October 15, 2023",
      author: "Jane Smith",
      category: "Web Development",
      tags: ["React", "JavaScript", "Beginner"],
    },
  ]);

  return (
    <div className="min-h-screen p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-6">
        Blog Posts
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-100 dark:bg-slate-800 rounded-md shadow-lg p-6 transition duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl text-blue-600 dark:text-blue-300">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Published on {post.date} by {post.author} | Category:{" "}
              {post.category}
            </p>
            <p className="text-gray-800 dark:text-white my-4">{post.content}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPost;
