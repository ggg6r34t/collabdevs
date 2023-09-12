import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitLabStrategy } from "passport-gitlab2";
import dotenv from "dotenv";

import {
  findOrCreateUserService,
  findUserByEmailService,
} from "../services/users";
import { UnauthorizedError } from "../helpers/apiError";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;


export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },

  async (payload, done) => {
    try {
      const userEmail = payload.email;
      const foundUser = await findUserByEmailService(userEmail);

      if (!foundUser) {
        throw new UnauthorizedError("User not found.");
      }

      done(null, foundUser);
    } catch (error) {
      console.error("JWT Strategy Error", error);
      done(error, false);
    }
  }
);

export const githubStrategy = new GitHubStrategy(
  {
    clientID: "process.env.GITHUB_CLIENT_ID",
    clientSecret: "process.env.GITHUB_CLIENT_SECRET",
    callbackURL: "/auth/github/callback", // this URL should match your route
  },
  async (_: any, __: any, profile: any, done: any) => {
    try {
      // create a payload object with relevant data
      const userPayload = {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        username: profile?.displayName,
        email: profile?.email,
        avatar: profile?.avatar,
      };

      // use the findOrCreateUserService function
      const user = await findOrCreateUserService(userPayload);

      return done(null, user);
    } catch (error) {
      console.error("GitHub Strategy Error", error);
      done(error, false);
    }
  }
);

const clientId = process.env.GOOGLE_CLIENT_ID as string
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string
export const googleStrategy = new GoogleTokenStrategy(
  {
    clientID: clientId,
// clientSecret: clientSecret,
  //callbackURL: "http://localhost:8000/api/v1/users/google-login", // this URL should match your route
  },
  async (parsedToken: any, googleId: string, done: any) => {
    try {
      const userPayload = {
        firstName: parsedToken?.payload?.given_name,
        lastName: parsedToken?.payload?.family_name,
        userName: parsedToken?.payload?.displayName,
        email: parsedToken?.payload?.email,
        avatar: parsedToken?.payload?.avatar,
      };

      // if the user doesn't exist, create a new user
      const foundUser = await findOrCreateUserService(userPayload);

      return done(null, foundUser);
    } catch (error) {
      console.error("Google Strategy Error", error);
      done(error, false);
    }
  }
);

export const gitlabStrategy = new GitLabStrategy(
  {
    clientID: "process.env.GITLAB_CLIENT_ID",
    clientSecret: "process.env.GITLAB_CLIENT_SECRET",
    callbackURL: "/auth/gitlab/callback", // this URL should match your route
  },
<<<<<<< HEAD
  async (_: any, __: any, profile: any, done: any) => {
=======
  async (_, __, profile, done) => {
>>>>>>> origin/comments
    try {
      // create a payload object with relevant data
      const userPayload = {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        username: profile?.username,
        email: profile?.email,
        avatar: profile?.avatar,
      };

      // use the findOrCreateUserService function
      const user = await findOrCreateUserService(userPayload);

      return done(null, user);
    } catch (error) {
      console.error("GitLab Strategy Error", error);
      done(error, false);
    }
  }
);
