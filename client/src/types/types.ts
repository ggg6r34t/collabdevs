export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  isBanned: boolean;
  lastLogin: Date;
  role: string;
  avatar: string;
};
