import React from "react";

import Comment from "./Comment";

const comments = [
  {
    _id: "1",
    timestamp: "1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. Duis vel sem nec nibh
      porttitor congue. In mattis tincidunt tincidunt. Aliquam
      accumsan non nisi sit amet rutrum. `,
    author: "Habeeb",
  },
  {
    _id: "2",
    timestamp: "8",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum nec condimentum dui. Maecenas sit amet iaculis
      turpis. Vivamus eget ornare sapien. `,
    author: "Zaka",
  },

  {
    _id: "3",
    timestamp: "24",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    author: "Mustafa",
  },
  {
    _id: "4",
    timestamp: "1",
    content: `Lorem ipsum dolor sit amet.`,
    author: "Habeeb",
  },
];

function CommentSection() {
  return (
    <div>
      <ul className="mt-4">
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;
