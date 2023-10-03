import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

import {
  findOrCreateUserService,
  findUserByEmailService,
} from "../services/users";
import { UnauthorizedError } from "../helpers/apiError";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY as string;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET as string;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

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

export const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: TWITTER_CONSUMER_KEY, // API Key
    consumerSecret: TWITTER_CONSUMER_SECRET, //API Key Secret
    callbackURL: "/api/v1/auth/twitter/callback",
  },
  async (_: any, __: any, profile: any, done: any) => {
    try {
      // check if the necessary fields exist in the profile
      // if (!profile || !profile.id || !profile.displayName || !profile.email) {
      //   return done(new Error("Incomplete Twitter profile data"), false);
      // }

      const userPayload = {
        twitterId: profile.id,
        firstName: profile.username, // username as firstname
        lastName: "", // unavailable data
        userName: profile.displayName,
        email: profile.email,
        avatar: profile._json.profile_image_url_https,
      };

      const user = await findOrCreateUserService("twitter", userPayload);
      return done(null, user);
    } catch (error) {
      console.error("Twitter Strategy Error", error);
      done(error, false);
    }
  }
);

export const githubStrategy = new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/github/callback",
  },

  async (_: any, __: any, profile: any, done: any) => {
    try {
      const userPayload = {
        githubId: profile?.id,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        username: profile?.displayName,
        email: profile?.email,
        avatar: profile?.avatar,
      };

      const user = await findOrCreateUserService("github", userPayload);

      return done(null, user);
    } catch (error) {
      console.error("GitHub Strategy Error", error);
      done(error, false);
    }
  }
);

export const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : undefined;

      const avatar =
        profile.photos && profile.photos.length > 0
          ? profile.photos[0]?.value
          : undefined;

      if (!email && !avatar) {
        return done(
          new Error("No email or avatar found in the Google profile") as Error,
          false
        );
      }

      const userPayload = {
        googleId: profile.id,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        userName: profile.displayName,
        email,
        avatar,
      };

      const user = await findOrCreateUserService("google", userPayload);

      return done(null, user);
    } catch (error) {
      console.error("Google Strategy Error", error);
      return done(error as Error, false);
    }
  }
);
