export type Post = {
  _id: string;
  title: string;
  content: string;
  url?: string;
  userId: string;
  userName: string;
  voteScore: number;
  createdAt: string;
  updatedAt: string;
};

export type User = { id: number; username: string; email: string };

export type Comment = Post & {
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Reply = Post &
  Comment & {
    postId: string;
    commentId: string;
    userId: string;
    userName: string;
    content: string;
  };

export type SavedPost = Post & {
  _id: string;
  userId: string;
  postId: string;
  savedAt: Date;
};

export type Feedback = {
  id: number;
  feedback: string;
};

export type UserGoogle = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
};
