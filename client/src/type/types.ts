export type LoginCredentials = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  url?: string;
  userId: string;
  userName: string;
  upvoted: boolean;
  downvoted: boolean;
  voteScore: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  headline: string;
  bio: string;
  email: string;
  password: string;
  role: string;
  token: string;
  isBanned: boolean;
  avatar: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
  rememberMe: boolean;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
  };
};

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

export type SavedPost = {
  _id: string;
  userId: string;
  postId: Post;
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

export type AuthToken = string | null;
