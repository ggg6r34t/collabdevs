import express, { Express } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";

import "./config/passport";
import User from "./models/User";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import userRoutes from "./routes/userRoutes";
import { googleStrategy, jwtStrategy } from "./config/passport";
import replyRoutes from "./routes/replyRoutes";
import savedPostRoutes from "./routes/savedPostRoutes";

const PORT = 15397;

const app: Express = express();

const redisClient = createClient({
  password: process.env.PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: PORT,
  },
});

app.use(express.json());
app.use(cookieParser());

// middleware setup
app.use(cors());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET!, // the non-null assertion operator (!) confirms the environment variable has a value.
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false while using localhost (not secured)
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);
passport.use(googleStrategy);

// serialize user into the session
passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

// deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    done(null, user); // user found and deserialized
  } catch (error) {
    done(error, false);
  }
});

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes, commentRoutes);
app.use("/api/v1/savedposts", savedPostRoutes);
app.use("/api/v1/replies", replyRoutes);

// error handler
app.use(apiErrorHandler);

export default app;
