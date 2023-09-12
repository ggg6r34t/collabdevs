import express, { Express } from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import "./config/passport";
import User from "./models/User";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import apiErrorHandler from "./middlewares/apiErrorHandler";
import userRoutes from "./routes/userRoutes";
import { googleStrategy, jwtStrategy } from "./config/passport";

const app: Express = express();
app.use(express.json());

// middleware setup
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // The non-null assertion operator (!) confirms the environment variable has a value.
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false while using local host (not secured)
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(jwtStrategy);
passport.use(googleStrategy)

// needs work, doesn't work as intended
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);

// error handler
app.use(apiErrorHandler);

export default app;
