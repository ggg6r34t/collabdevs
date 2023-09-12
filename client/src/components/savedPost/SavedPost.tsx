import { useState } from "react";
// import { useSelector } from "react-redux";

import SavedPostItem from "./SavedPostItem";
// import { RootState } from "../../redux/store";
import { Post } from "../../type/types";

function SavedPosts() {
  //   const savedPosts = useSelector((state: RootState) => state.posts.savedPosts);
  const [savedPosts, setSavedPosts] = useState<Post[]>([
    {
      _id: "1",
      postTitle:
        "Building a Real-time Chat Application with Full-Stack Development",
      timestamp: "1",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. Duis vel sem nec nibh
      porttitor congue. In mattis tincidunt tincidunt. Aliquam
      accumsan non nisi sit amet rutrum. Pellentesque porttitor
      nulla ut nunc dapibus, suscipit aliquet arcu iaculis. Fusce id
      mollis enim. Proin nec nibh dui. In iaculis tempor risus, eu
      faucibus massa cursus a. Integer in sollicitudin est. Nunc
      malesuada sit amet nunc ac elementum. Cras efficitur turpis
      nisi, ut tincidunt elit posuere vel.`,
      author: "Habeeb",
    },
    {
      _id: "2",
      postTitle:
        "Scaling Your Full-Stack Web App: Best Practices and Strategies",
      timestamp: "8",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. Duis vel sem nec nibh
      porttitor congue. In mattis tincidunt tincidunt. Aliquam
      accumsan non nisi sit amet rutrum. Pellentesque porttitor
      nulla ut nunc dapibus, suscipit aliquet arcu iaculis. Fusce id
      mollis enim. Proin nec nibh dui. In iaculis tempor risus, eu
      faucibus massa cursus a. Integer in sollicitudin est. Nunc
      malesuada sit amet nunc ac elementum. Cras efficitur turpis
      nisi, ut tincidunt elit posuere vel.`,
      author: "Zaka",
    },

    {
      _id: "3",
      postTitle: "Secure Coding Practices for Full-Stack Developers",
      timestamp: "24",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. Duis vel sem nec nibh
      porttitor congue. In mattis tincidunt tincidunt. Aliquam
      accumsan non nisi sit amet rutrum. Pellentesque porttitor
      nulla ut nunc dapibus, suscipit aliquet arcu iaculis. Fusce id
      mollis enim. Proin nec nibh dui. In iaculis tempor risus, eu
      faucibus massa cursus a. Integer in sollicitudin est. Nunc
      malesuada sit amet nunc ac elementum. Cras efficitur turpis
      nisi, ut tincidunt elit posuere vel.`,
      author: "Mustafa",
    },
  ]);

  const removeSavedPost = (postId: string) => {
    setSavedPosts((prevSavedPosts) =>
      prevSavedPosts.filter((post) => post._id !== postId)
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Saved Posts</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedPosts.map((post: Post) => (
          <SavedPostItem
            key={post._id}
            post={post}
            onRemove={() => removeSavedPost(post._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedPosts;
