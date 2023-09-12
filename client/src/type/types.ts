export type Post = {
  _id: string;
  author: string;
  postTitle: string;
  timestamp: string;
  content: string;
};

export type User = { id: number; username: string; email: string };
