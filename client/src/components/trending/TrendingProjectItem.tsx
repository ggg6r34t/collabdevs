import React from "react";

import { Post } from "../../type/types";

type Props = {
  post: Post;
};

function TrendingProjectItem({ post }: Props) {
  return (
    <>
      <div className="p-3 pt-2 pb-0">
        <p className="text-gray-600">{post.title}</p>
      </div>
      <div className="pl-3">
        <p>@{post.userName}</p>
      </div>
    </>
  );
}

export default TrendingProjectItem;
