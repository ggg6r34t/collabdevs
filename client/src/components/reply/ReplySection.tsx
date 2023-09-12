import React from "react";
import Reply from "./Reply";

const replies = [
  {
    _id: "",
    timestamp: "24",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    author: "Mustafa",
  },
  {
    _id: "2",
    timestamp: "1",
    content: `Lorem ipsum dolor sit amet.`,
    author: "Habeeb",
  },
];

function ReplySection() {
  return (
    <div>
      <ul className="mt-4">
        {replies.map((reply, index) => (
          <Reply key={index} reply={reply} />
        ))}
      </ul>
    </div>
  );
}

export default ReplySection;
